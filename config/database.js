import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.DB_STRING
const MONGODB_DB = "sladashboard"

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export default async function connectToDatabase() {
  const client = new MongoClient(MONGODB_URI, opts)
  await client.connect()
  let db = client.db(MONGODB_DB)
  return db
}