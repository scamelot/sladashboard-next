// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDatabase from "../../config/database";

import { redirect } from "next/dist/server/api-utils";

import dayjs from 'dayjs'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const today = dayjs().format('MM-DD-YYYY')
const yesterday = dayjs().subtract(1, 'day').format('MM-DD-YYYY')



export default async function handler (req, res) {
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