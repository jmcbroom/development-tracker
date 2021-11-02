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
      <h2>Let us know what you&apos;re seeing.</h2>
      <p>Do you see a project in your neighborhood or development activity? We&apos;ll check it out and get back to you.</p>
      <div style={{width: 800}}>
        <div style={{display: 'flex', flexDirection: 'column', margin: `1em 0em`}}>
          <label htmlFor="address">Where are you?</label>
          <input type="text" value={address} placeholder="Type an address or intersection." onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', margin: `1em 0em`}}>
          <label htmlFor="textarea">What do you see?</label>
          <textarea cols={80} rows={5} value={report} onChange={(e) => setReport(e.target.value)} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', margin: `1em 0em`}}>
          <label htmlFor="photoupload">Upload a photo</label>
          <input type="file" id="photoupload" onChange={handleUpload} style={{padding: `.5em 0em`}} />
        </div>
        <button onClick={() => handleClick(record)} style={{display: 'block', padding: '1em', width: 200}}>Send</button>
      </div>
    </>
  )
}