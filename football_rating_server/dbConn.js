import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_ATLAS;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let database;
const connect = async () => {
  if (database) {
    return database;
  }
  try {
    await client.connect();
    database = client.db("football");
    return database;
  } catch (err) {
    throw new Error(err);
  }
};

export default connect;
export { client };
