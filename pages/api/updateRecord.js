// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

import Airtable from "airtable"
export default function handler(req, res) {

  const { id, column, value, table } = req.query

  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('apptXJJeHse3v7SAS');

  base('Projects').update(id, {
      [column]: value
    })

  res.status(200).json({ status: 'success' })
}
