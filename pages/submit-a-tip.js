import { useState } from "react"
import { supabase } from '../utils/supabaseClient'

const handleClick = (queryString, setResponse) => {
  console.log(new URLSearchParams(queryString).toString())
  fetch(`/api/createReport?${new URLSearchParams(queryString).toString()}`)
    .then(r => r.json())
    .then(d => setResponse(d))
}


export default function SubmitPage() {
  
  const [photoUrl, setPhotoUrl] = useState('')
  const [response, setResponse] = useState(null)

  async function handleUpload(e) {
    const avatarFile = e.target.files[0]
    console.log(avatarFile)
    const { data, error } = await supabase
      .storage
      .from('report-photos')
      .upload(avatarFile.name, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })
    setPhotoUrl(`https://zikieyzmibovmrmmdxso.supabase.in/storage/v1/object/public/${data.Key}`)
    console.log(photoUrl)
  }
  
  const [address, setAddress] = useState('')
  const [report, setReport] = useState('')
  
  let record = {
    Address: address,
    Report: report
  }

  if(photoUrl !== '') {
    record.Attachments = JSON.stringify([{url: photoUrl}])
  }

  console.log(record, response)

  return (
    <>
      <section className="w-full p-2 md:p-4 lg:p-8">
        <h2 className="text-xl">Let us know what you&apos;re seeing.</h2>
        <p className="my-4">Do you see a project in your neighborhood or development activity? We&apos;ll check it out and get back to you.</p>
        <div className="flex flex-col mb-2 border">
        <label htmlFor="textarea">Where are you?</label>
          <input type="text" value={address} placeholder="Type an address or intersection." onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="flex flex-col mb-2 border">
          <label htmlFor="textarea">What do you see?</label>
          <textarea cols={80} rows={5} value={report} onChange={(e) => setReport(e.target.value)} />
        </div>
        <div className="flex flex-col mb-2 border">
        <label htmlFor="textarea">Upload a photo</label>
          <input type="file" id="photoupload" onChange={handleUpload} className="p-4" />
        </div>
        <div className="flex items-center justify-around">
          {!response && <button onClick={() => handleClick(record, setResponse)} disabled={response !== null} className="my-8 mx-auto w-32">{"Send report"}</button>}
          {response && <div className="my-4">Thanks, we received your report!</div>}
        </div>
      </section>
    </>
  )
}