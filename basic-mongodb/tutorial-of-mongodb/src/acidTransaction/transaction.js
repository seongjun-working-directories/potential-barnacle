// https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions
const {MongoClient} = require('mongodb');
/*
[ Rule of Thumb ]
Data that is accessed together should be stored together.

[ Multi-Document Transaction ]
두 개 이상의 Document가 상호작용하는 상황에서 두 Document가 ACID Transaction을 지킬 수 있도록 함
To utilize transactions, MongoDB must be configured as a replica set or a shared cluster.

MongoDB에서 transaction은 “replica set”에서만 가능합니다. standalone에서는 불가능합니다.
어차피 실서비스에서는 replica set을 이용해야하니 신경쓰지 않으셔도 됩니다.

출처 : https://medium.com/nodejs-server/mongoose-%ED%8A%B8%EB%A0%8C%EC%A0%9D%EC%85%98-714870976af5
Transaction은 MongoDB sessions에 구성되어 있습니다.
startSession()를 호출한뒤 startTransaction() function을 호출해야 트렌젝션을 시작할 수 있습니다.
트렌젝션 안에서 작업을 실행하려면 session을 옵션으로 전달해주어야만 합니다.
*/

/**
 * Create a reservation by storing information in both the users collection and the listingsAndReviews collection
 * Note: this function assumes there is only one Airbnb listing in the collection with the given name.  If more than
 * listing exists with the given name, a reservation will be created for the first listing the database finds.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} userEmail The email address of the user who is creating the reservation
 * @param {String} nameOfListing The name of the Airbnb listing to be reserved
 * @param {Array.Date} reservationDates An array of the date(s) for the reservation
 * @param {Object} reservationDetails An object containing additional reservation details that need to be stored with the reservation
 */
 async function createReservation(client, userEmail, nameOfListing, reservationDates, reservationDetails) {

    /**
     * The users collection in the sample_airbnb database
     */
    const usersCollection = client.db("sample_airbnb").collection("users");

    /**
     * The listingsAndReviews collection in the sample_airbnb database
     */
    const listingsAndReviewsCollection = client.db("sample_airbnb").collection("listingsAndReviews");

    /**
     * The reservation document that will be added to the users collection document for this user
     */
    const reservation = createReservationDocument(nameOfListing, reservationDates, reservationDetails);

    // Step 1: Start a Client Session
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#startSession for the startSession() docs
    const session = client.startSession();

    // Step 2: Optional. Define options for the transaction
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
        // Note: The callback for withTransaction MUST be async and/or return a Promise.
        // See https://mongodb.github.io/node-mongodb-native/3.6/api/ClientSession.html#withTransaction for the withTransaction() docs        
        const transactionResults = await session.withTransaction(async () => {

            // Important:: You must pass the session to each of the operations   

            // Add a reservation to the reservations array for the appropriate document in the users collection
            const usersUpdateResults = await usersCollection.updateOne(
                { email: userEmail },
                { $addToSet: { reservations: reservation } },
                { session });
            console.log(`${usersUpdateResults.matchedCount} document(s) found in the users collection with the email address ${userEmail}.`);
            console.log(`${usersUpdateResults.modifiedCount} document(s) was/were updated to include the reservation.`);

            // Check if the Airbnb listing is already reserved for those dates. If so, abort the transaction.
            const isListingReservedResults = await listingsAndReviewsCollection.findOne(
                { name: nameOfListing, datesReserved: { $in: reservationDates } },
                { session });
            if (isListingReservedResults) {
                await session.abortTransaction();
                console.error("This listing is already reserved for at least one of the given dates. The reservation could not be created.");
                console.error("Any operations that already occurred as part of this transaction will be rolled back.")
                return;
            }

            //  Add the reservation dates to the datesReserved array for the appropriate document in the listingsAndRewiews collection
            const listingsAndReviewsUpdateResults = await listingsAndReviewsCollection.updateOne(
                { name: nameOfListing },
                { $addToSet: { datesReserved: { $each: reservationDates } } },
                { session });
            console.log(`${listingsAndReviewsUpdateResults.matchedCount} document(s) found in the listingsAndReviews collection with the name ${nameOfListing}.`);
            console.log(`${listingsAndReviewsUpdateResults.modifiedCount} document(s) was/were updated to include the reservation dates.`);

        }, transactionOptions);

        if (transactionResults) {
            console.log("The reservation was successfully created.");
        } else {
            console.log("The transaction was intentionally aborted.");
        }
    } catch (e) {
        console.log("The transaction was aborted due to an unexpected error: " + e);
    } finally {
        // Step 4: End the session
        await session.endSession();
    }

}

/**
 * A helper function that generates a reservation document
 * @param {String} nameOfListing The name of the Airbnb listing to be reserved
 * @param {Array.Date} reservationDates An array of the date(s) for the reservation
 * @param {Object} reservationDetails An object containing additional reservation details that need to be stored with the reservation
 * @returns {Object} The reservation document
 */
function createReservationDocument(nameOfListing, reservationDates, reservationDetails) {
    // Create the reservation
    let reservation = {
        name: nameOfListing,
        dates: reservationDates,
    }

    // Add additional properties from reservationDetails to the reservation
    for (let detail in reservationDetails) {
        reservation[detail] = reservationDetails[detail];
    }

    return reservation;
}

async function main() {
    const uri = "mongodb+srv://hamish-official:<password>@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        // await createReservationDocument("Infinite Views",
        //     [new Date("2019-12-31"), new Date("2020-01-01")],
        //     { pricePerNight: 180, specialRequests: "Late checkout", breakfastIncluded: true });

        // (Expected Return Value):
        // { 
        //     name: 'Infinite Views',
        //     dates: [ 2019-12-31T00:00:00.000Z, 2020-01-01T00:00:00.000Z ],
        //     pricePerNight: 180,
        //     specialRequests: 'Late checkout',
        //     breakfastIncluded: true 
        // }


        await createReservation(client,
            "leslie@example.com",
            "Infinite Views",
            [new Date("2019-12-31"), new Date("2020-01-01")],
            {pricePerNight: 180, specialRequest: "Late checkout", breakfastIncluded: true}
        );
    }
    catch(e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);