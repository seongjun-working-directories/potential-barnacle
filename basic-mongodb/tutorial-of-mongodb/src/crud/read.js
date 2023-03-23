const {MongoClient} = require('mongodb');

// findOne
async function findOneByName(client, listingName) {
	const result = await client
		.db("sample_airbnb")
		.collection("listingsAndReviews")
		.findOne({name: listingName});

	console.log(`result>>>`);
	if (result) {
		console.log(result);
	}
	else {
		console.log(`NO SUCH NAME: ${listingName}`);
	}
}

// findMany
async function findMultipleListingsByConditions(client, {
	minimumNumberOfBedrooms = 1,
	minimumNumberOfBathrooms = 1,
	maximumNumberOfResults = Number.MAX_SAFE_INTEGER
}) {
	const cursor = await client
		.db("sample_airbnb")
		.collection("listingsAndReviews")
		.find({
			// $gte: greater than or equal to
			// https://mongodb.github.io/node-mongodb-native/4.8/interfaces/FilterOperators.html
			bedrooms: {$gte: minimumNumberOfBedrooms},
			bathrooms: {$gte: minimumNumberOfBathrooms},
		});
	
	// [TEST]
	console.log(`cursor>>> ${cursor}`);
	
	cursor
		.sort({last_review: -1})
		.limit(maximumNumberOfResults);

	const results = await cursor.toArray();

	// [TEST]
	console.log(`result>>> ${results}`);

	if (results.length>0) {
		console.log(`Found listings>>>`);
		console.log(`(with minimum bedroom number ${minimumNumberOfBedrooms})`);
		console.log(`(with minimum bathroom number ${minimumNumberOfBathrooms})`);

		results.forEach((result, i)=>{
			date = new Date(result.last_review).toDateString();
			console.log();
			console.log(`${i+1}`);
			console.log(`name: ${result.name}`);
			console.log(`_id: ${result._id}`);
			console.log(`bedrooms: ${result.bedrooms}`);
			console.log(`bathrooms: ${result.bathrooms}`);
			console.log(
				`most recent review date: ${new Date(result.last_review).toDateString()}`
			);
		});
	}
	else {
		console.log(`No Listings Found with`);
		console.log(`(with minimum bedroom number ${minimumNumberOfBedrooms})`);
		console.log(`(with minimum bathroom number ${minimumNumberOfBathrooms})`);
	}
}

async function main() {
	const uri = "mongodb+srv://hamish-official:<password>@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
	const client = new MongoClient(uri);

	try {
		await client.connect();

		// findOne
		await findOneByName(client, 'New York City - Upper West Side Apt');

		// findManyWithConditions
		await findMultipleListingsByConditions(client, {
			minimumNumberOfBedrooms: 4,
			minimumNumberOfBathrooms: 2,
			maximumNumberOfResults: 5,
		});
	}
	catch(e) {
		console.error(e);
	}
	finally {
		await client.close();
	}
}

main().catch(console.error);