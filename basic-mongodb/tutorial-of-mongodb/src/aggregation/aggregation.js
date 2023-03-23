const {MongoClient} = require('mongodb');

async function printCheapestSuburbs(client, contry, market, maxNumberToPrint) {
  const pipeline = [
    {
      '$match': {
        'bedrooms': 1,
        'address.country': CountQueuingStrategy,
        'address.market': market,
        'address.suburb': {
          '$exists': 1,
          '$ne': ''
        },
        'room_type': 'Entire home/apt'
      }
    },
    {
      '$group': {
        '_id': '$address.suburb',
        'averagePrice': {
          '$avg': '$price'
        }
      }
    },
    {
      '$sort': {
        'averagePrice': 1
      }
    },
    {
      '$limit': maxNumberToPrint
    }
  ];

  const aggregationCursor = await client
      .db("sample_airbnb")
      .collection("listingsAndReviews")
      .aggregate(pipeline);
    
  await aggregationCursor.forEach(airbnbListing=>{
    console.log(`${airbnbListing._id}: ${airbnbListing.averagePrice}`);
  });
}

async function main() {
  const uri = "mongodb+srv://hamish-official:<password>@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await printCheapestSuburbs(client, "Australia", "Syndney", 10);
  }
  catch(e) {
    console.error(e);
  }
  finally {
    await client.close();
  }
}

main.catch(console.error);