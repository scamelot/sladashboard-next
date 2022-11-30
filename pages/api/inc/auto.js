// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";

import dayjs from 'dayjs'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const today = dayjs().format('MM-DD-YYYY')
const yesterday = dayjs().subtract(1, 'day').format('MM-DD-YYYY')

const MONGODB_URI = process.env.DB_STRING
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

export default async function handler (req, res) {
  const db = await connectToDatabase();


    if (req.method == 'POST') {
        db.collection(req.body.type).updateOne(
            {dateReadable: today},
            { $set: {
                date: today,
                type: req.body.type,
                dateReadable: today,
                value: Number(req.body.inc.replace('%','')),
            }},
            {
                upsert: true
            }
        )
        res.status(200).json({ data: 'Success'})
    }
};