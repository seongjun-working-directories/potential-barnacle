// get mongo client --> connect to mongodb
const {MongoClient} = require('mongodb');

// list databases in cluster
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("databasesList>>>");
  databasesList.databases.forEach(db=>{
    console.log(`- ${db.name}`);
  });
};

async function main() {
  // Mongodb Atlas에서 Cluster0에 connect하고 복사해둔 connection 코드
  const uri = "mongodb+srv://hamish-official:<password>@cluster0.qxy53z0.mongodb.net/?retryWrites=true&w=majority";

  // instance of mongo client
  const client = new MongoClient(uri);

  try {
    // connect to cluster
    await client.connect();

    // get database list
    await listDatabases(client);
  }
  catch(e) {
    console.error(e);
  }
  finally {
    await client.close();
  }
}

main().catch(console.error);