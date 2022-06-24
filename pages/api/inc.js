// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";
import { redirect } from "next/dist/server/api-utils";

const MONGODB_URI = "mongodb://localhost:27017"
const MONGODB_DB = "sladashboard"

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export async function connectToDatabase() {
  const client = new MongoClient(MONGODB_URI, opts)
  await client.connect()
  let db = client.db(MONGODB_DB)
  return db
}

export default async (req, res) => {
  const db = await connectToDatabase();

  const slas = await db
    .collection("inc")
    .find({})
    .toArray();

    if (req.method == 'GET') {
        res.json(slas);
    }

    else if (req.method == 'POST') {
        console.log(req.body)
        db.collection("inc").updateOne(
            {dateReadable: req.body.dateReadable},
            { $set: {
                date: req.body.date,
                dateReadable: req.body.dateReadable,
                value: req.body.inc,
            }},
            {
                upsert: true
            }
        )
        db.collection("req").updateOne(
            {dateReadable: req.body.dateReadable},
            { $set: {
                date: req.body.date,
                dateReadable: req.body.dateReadable,
                value: req.body.req,
            }},
            {
                upsert: true
            }
        )
        res.status(200).json({ data: 'Success'})
    }
};