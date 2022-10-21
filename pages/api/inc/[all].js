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
    .find({"date": 
    {
        $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
    }})
    .toArray()
  const allReqSlas = await db
    .collection("req")
    .find({"date": 
    {
        $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
    }})
    .toArray()

   const data = {
    inc: [...allIncSlas],
    req: [...allReqSlas]
   }

   res.end(JSON.stringify(data))
}