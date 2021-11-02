// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

import Airtable from "airtable"
export default function handler(req, res) {

  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('apptXJJeHse3v7SAS');

  let newRecord = req.query
  newRecord.Attachments = JSON.parse(newRecord.Attachments)

  base('Reports').create(req.query).then(r => console.log(r))

  res.status(200).json({ status: 'success' })
}
