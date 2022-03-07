// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

import Airtable from "airtable"
export default function handler(req, res) {

  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);

  base('Contact Us').create(req.query)
    .then(r => {
      res.status(200).json({ status: 'success', newRecord: r._rawJson })
    }
  )
}
