const {MongoClient} = require('mongodb');

// node-mongodb documentation link :
// https://mongodb.github.io/node-mongodb-native/4.8/

// updateOne
// https://mongodb.github.io/node-mongodb-native/4.8/classes/Collection.html#updateOne
// updateOne은 가장 첫 번째로 필터에 일치하는 항목만을 변경함
async function updateListingByName(client, listingName, listingUpdate) {
    const result = await client
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .updateOne(
            // filter
            {name: listingName},
            // update
            {$set: listingUpdate}
        );
    
    console.log(`the number of matched : ${result.matchedCount}`);
    console.log(`the number of updated : ${result.modifiedCount}`);
}

// upsert
// upsert는 update 뿐만 아니라 document가 없을 경우 insert 기능을 함
async function upsertListingByName(client, listingName, listingUpdate) {
    const result = await client
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .updateOne(
            // filter
            {name: listingName},
            // update
            {$set: listingUpdate},
            // UPSERT SETTING
            {upsert: true}
        );

    console.log(`the number of matched : ${result.matchedCount}`);
    
    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId}`);
    }
    else {
        console.log(`the number of updated: ${result.modifiedCount}`);
    }
}

// updateMany
// property type이 없는 listings들을 찾아 해당 속성을 만들어주는 함수
async function updateAllListingsToHavePropertyType(client) {
    const result = await client
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .updateMany(
            {property_type: {$exists: false}},
            {$set: {property_type: "Unknown"}}
        );
    
    console.log(`matched count: ${result.matchedCount}`);
    console.log(`modified count: ${result.modifiedCount}`);
}

async function main() {
    const uri = "mongodb+srv://hamish-official:<password>!@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        // updateOne
        await updateListingByName(
            client,
            "Grace 1 - Habitat Apartments",
            { bedrooms: 6, beds: 8}
        );

        // upsertOne
        await upsertListingByName(
            client,
            "Cozy Cottage",
            {name: "Cozy Cottage", bedrooms: 2, bathrooms: 1}
        );

        // upsertOneAgain
        await upsertListingByName(
            client,
            "Cozy Cottage",
            {name: "Cozy Cottage", bedrooms: 2, bathrooms: 1}
        );

        // updateMany
        await updateAllListingsToHavePropertyType(client);
    }
    catch(e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);