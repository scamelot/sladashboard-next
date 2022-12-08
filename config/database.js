import { MongoClient } from "mongodb";
import clientPromise from "../lib/mongodb";

const MONGODB_DB = 'sladashboard'

export default async function connectToDatabase() {
  const client = await clientPromise
  let db = client.db(MONGODB_DB)
  return db
}