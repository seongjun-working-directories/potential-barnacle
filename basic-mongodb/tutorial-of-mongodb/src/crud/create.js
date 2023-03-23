// https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/
const {MongoClient} = require('mongodb');

// Mongodb Atlas에서 Load Sample Data를 통해 내려받은 자료는 Browse Collections에서 확인 가능
// sample_airbnb.listingsAndReviews > ListingAndReviews에 새로운 데이터를 넣는 함수
async function createListing(client, newListing) {
  // https://mongodb.github.io/node-mongodb-native/4.8/ 에서
  // insertOne의 사용 방법을 확인할 수 있음
  const result = await client
    // 데이터베이스 선택
    .db("sample_airbnb")
    // 컬렉션(테이블) 선택
    // 해당 이름의 컬렉션(테이블)이 없을 경우, 자동 생성됨
    .collection("listingsAndReviews")
    // https://mongodb.github.io/node-mongodb-native/4.8/classes/Collection.html#insertOne
    .insertOne(newListing);
  
  console.log(`New Listing created>>>id=${result.insertedId}`);
}

// inserting more than one document
async function createMultipleListings(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);
  
    console.log(`${result.insertedCount} new listings created>>>`);
    console.log(result.insertedIds);
}

async function main() {
  const uri = "mongodb+srv://hamish-official:<password>@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // insertOne
    await createListing(client, {
      name: 'This is Name',
      summary: 'This is Summary',
      bedrooms: 10,
      bathrooms: 10,
    });

    // insertMany
    await createMultipleListings(client, [
      {
        name: 'This is Name 1',
        summary: 'This is Summary 1',
        bedrooms: 10,
        bathrooms: 10,
        last_review: new Date(),
      },
      {
        name: 'This is Name 2',
        summary: 'This is Summary 2',
        bedrooms: 10,
        bathrooms: 10,
        last_review: new Date(),
      },
      {
        name: 'This is Name 3',
        summary: 'This is Summary 3',
        bedrooms: 10,
        bathrooms: 10,
        last_review: new Date(),
      },
    ]);
  }
  catch(e) {
    console.error(e);
  }
  finally {
    await client.close();
  }
}

main().catch(console.error);