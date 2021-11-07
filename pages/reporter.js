import { useState } from "react"
import { supabase } from '../utils/supabaseClient'

const handleClick = (queryString, setResponse) => {
  console.log(new URLSearchParams(queryString).toString())
  fetch(`/api/createReport?${new URLSearchParams(queryString).toString()}`)
    .then(r => r.json())
    .then(d => setResponse(d))
}


export default function ReporterPage() {
  
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
      <section className="px-4 my-3">
        <h2 className="text-xl">Let us know what you&apos;re seeing.</h2>
        <p>Do you see a project in your neighborhood or development activity? We&apos;ll check it out and get back to you.</p>
      </section>
      <div className="w-full px-2 md:px-4 lg:px-8 py-2">
        <div className="flex flex-col mb-2 border">
        <label htmlFor="textarea" className="p-2 bg-gray-300 font-semibold">Where are you?</label>
          <input type="text" className="p-3" value={address} placeholder="Type an address or intersection." onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="flex flex-col mb-2 border">
          <label htmlFor="textarea" className="p-2 bg-gray-300 font-semibold">What do you see?</label>
          <textarea className="p-3" cols={80} rows={5} value={report} onChange={(e) => setReport(e.target.value)} />
        </div>
        <div className="flex flex-col mb-2 border">
        <label htmlFor="textarea" className="p-2 bg-gray-300 font-semibold">Upload a photo</label>
          <input type="file" id="photoupload" onChange={handleUpload} className="p-4" />
        </div>
        <div className="flex items-center justify-around">
          {!response && <button onClick={() => handleClick(record, setResponse)} disabled={response !== null} className="my-8 mx-auto w-32 bg-gray-200 hover:bg-gray-300 rounded-lg p-2 border-2 border-black">{"Send report"}</button>}
          {response && <div className="my-4">Thanks, we received your report!</div>}
        </div>
      </div>
    </>
  )
}