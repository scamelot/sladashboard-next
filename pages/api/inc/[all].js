const MONGODB_URI = "mongodb://localhost:27017"
const MONGODB_DB = "sladashboard"
import { connectToDatabase } from "../inc"

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export default async function handler(req,res) {
    const { posts } = req.query

    const db = await connectToDatabase();

   const allIncSlas = await db
    .collection("inc")
    .find({})
    .toArray()
  const allReqSlas = await db
    .collection("req")
    .find({})
    .toArray()

   const data = {
    inc: [...allIncSlas],
    req: [...allReqSlas]
   }

   res.end(JSON.stringify(data))
}