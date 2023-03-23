const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://hamish-official:Tjdwns100!@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // console.log(createReservationDocument(
    //   'Infinite Views',
    //   [new Date('2021-12-31'), new Date('2022-01-01')],
    //   {pricePerNight: 180, specialRequests: 'Late Checkout', breakfastIncluded: true}
    // ));
    // [RESULT]
    // {
    //   name: 'Infinite Views',
    //   dates: [ 2021-12-31T00:00:00.000Z, 2022-01-01T00:00:00.000Z ],
    //   pricePerNight: 180,
    //   specialRequests: 'Late Checkout',
    //   breakfastIncluded: true
    // }

    await createReservation(
      client,
      'leslie@example.com',
      'infinite views',
      [new Date('2021-12-31'), new Date('2022-01-01')],
      {pricePerNight: 180, specialRequests: 'Late Checkout', breakfastIncluded: true}
    );
  }
  finally {
    await client.close();
  }
}

// helper function
function createReservationDocument(listingName, reservationDates, reservationDetails) {
  // `reservation` variable to make every reservation to have `name & dates`
  let reservation = {
      name: listingName,
      dates: reservationDates,
  };

  // reservation can have other properties(not only name & dates)
  // so the loop looks for reservation details parameter
  // and get all the properties in it
  for (let detail in reservationDetails) {
    reservation[detail] = reservationDetails[detail];
  }

  return reservation;
}

// function that actually creates the reservation
async function createReservation(client, userEmail, listingName, reservationDates, reservationDetails) {
  // 예시파일>> acidTransaction/dummy/dummyUsers.js
  const usersCollection = client.db('sample_airbnb').collection('users');
  // 예시파일>> acidTransaction/dummy/dummyListingsAndReviews.js
  const listingsAndReviewsCollection = client.db('sample_airbnb').collection('listingsAndReviews');

  const reservation = createReservationDocument(listingName, reservationDates, reservationDetails);
  
  const session = client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: {level: 'local'},
    writeConcern: {w: 'majority'},
  };

  try {
    const transactionResults = await session.withTransaction(async () => {
      const usersUpdateResults = await usersCollection.updateOne(
        {email: userEmail},
        {$addToSet: {reservations: reservation}},
        {session},
      );
      
      // [TEST]
      console.log(`usersUpdateResults>>> ${usersUpdateResults}`);
      console.log(`Match Count: ${usersUpdateResults.matchedCount}`);
      console.log(`Modified Count: ${usersUpdateResults.modifiedCount}`);

      // If already reserved in same date, deny the reservation request
      const isListingReservedResult = await listingsAndReviewsCollection.findOne(
        {name: listingName, datesReserved: {$in: reservationDates}},
        {session}
      );

      if (isListingReservedResult) {
        // roll back the update
        await session.abortTransaction();
        console.error(`This listing is already reserved!`);
        return;
      }

      const listingsAndReviewsUpdateResults = await listingsAndReviewsCollection.updateOne(
        {name: listingName},
        {$addToSet: {datesReserved: {$each: reservationDates}}},
        {session}
      );

      // [TEST]
      console.log(`Matched Count: ${listingsAndReviewsUpdateResults.matchedCount}`);
      console.log(`Modified Count: ${listingsAndReviewsUpdateResults.modifiedCount}`);
    }, transactionOptions);

    if (transactionResults) {
      console.log('The reservation is successfully created!');
    }
    else {
      console.log('The transaction was intentionally aborted.');
    }
  }
  catch(e) {
    console.log('The transaction is aborted due to an expected error:', e);
  }
  finally {
    await session.endSession();
  }
}

main().catch(console.error);
