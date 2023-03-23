const {MongoClient} = require('mongodb');

// deleteOne
async function deleteListingByName(client, listingName) {
    const result = await client
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .deleteOne({name: listingName});

    console.log(`deleted count: ${result.deletedCount}`);
}

// deleteMany
async function deleteMultipleListingByDate(client, date) {
    const result = await client
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .deleteMany({
            "last_scraped": {$lt: date}
        });
    
    console.log(`deleted count: ${result.deletedCount}`);
}

async function main() {
    const uri = "mongodb+srv://hamish-official:<password>@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        // deleteOne
        await deleteListingByName(client, "Cozy Cottage");

        // deleteMany
        await deleteMultipleListingByDate(client, new Date('2018-10-14'));
    }
    catch(e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);