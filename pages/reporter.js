import { useState } from "react"
import { supabase } from '../utils/supabaseClient'

const handleClick = (queryString) => {
  console.log(new URLSearchParams(queryString).toString())
  fetch(`/api/createReport?${new URLSearchParams(queryString).toString()}`)
    .then(r => r.json())
    .then(d => console.log(d))
}


export default function ReporterPage() {
  
  const [photoUrl, setPhotoUrl] = useState('')

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

  console.log(record)

  return (
    <>
      <section className="px-4">

      <h2>Let us know what you&apos;re seeing.</h2>
      <p>Do you see a project in your neighborhood or development activity? We&apos;ll check it out and get back to you.</p>
      </section>
      <div className="w-full px-2 md:px-4 lg:px-8 py-2 bg-gray-200">
        <div className="flex flex-col mb-2">
          <label htmlFor="address" className="py-2">Where are you?</label>
          <input type="text" className="p-3" value={address} placeholder="Type an address or intersection." onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="textarea" className="py-2">What do you see?</label>
          <textarea className="p-3" cols={80} rows={5} value={report} onChange={(e) => setReport(e.target.value)} />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="photoupload" className="py-2">Upload a photo</label>
          <input type="file" id="photoupload" onChange={handleUpload} className="" />
        </div>

        <div className="flex items-center justify-around">

        <button onClick={() => handleClick(record)} className="my-8 mx-auto w-32 bg-gray-300 hover:bg-gray-100 rounded-lg p-4 border-2 border-black">Send</button>
        </div>
      </div>
    </>
  )
}