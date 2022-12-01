import connectToDatabase from "../../../config/database";

export default async function handler(req,res) {

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
    inc: [...allIncSlas.slice(Math.max(allIncSlas.length - 30, 0))],
    req: [...allReqSlas.slice(Math.max(allReqSlas.length - 30, 0))]
   }

   res.end(JSON.stringify(data))
}