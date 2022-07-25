// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";
import { redirect } from "next/dist/server/api-utils";

import dayjs from 'dayjs'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const today = dayjs().format('MM-DD-YYYY')
const yesterday = dayjs().subtract(1, 'day').format('MM-DD-YYYY')

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

  const incSlas = await db
    .collection("inc")
    .find({})
    .limit(2)
    .sort({_id: -1})
    .toArray();
  const reqSlas = await db
    .collection("req")
    .find({})
    .limit(2)
    .sort({_id: -1})
    .toArray();
  const slas = incSlas.concat(reqSlas)

    if (req.method == 'GET') {
        res.json(slas);
    }

    else if (req.method == 'POST') {
        db.collection("inc").updateOne(
            {dateReadable: req.body.dateReadable},
            { $set: {
                date: req.body.date,
                type: "inc",
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
                type: "req",
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