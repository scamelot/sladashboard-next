// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectToDatabase from '../../../config/database'

import dayjs from 'dayjs'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const today = dayjs().format('MM-DD-YYYY')

export default async function handler (req, res) {
  const db = await connectToDatabase();


    if (req.method == 'POST') {
        let realValue = 100
        if (req.body.inc) {
            realValue = Number(req.body.inc.split('%')[0])
        }
        db.collection(req.body.type).updateOne(
            {dateReadable: today},
            { $set: {
                date: today,
                type: req.body.type,
                dateReadable: today,
                value: realValue,
            }},
            {
                upsert: true
            }
        )
        res.status(200).json({ data: 'Success'})
    }
};