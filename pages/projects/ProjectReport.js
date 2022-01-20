import { useState } from "react";
import SiteSection from "../../components/SiteSection";

const ProjectReport = ({ id }) => {

  const handleClick = (queryString, setResponse) => {
    fetch(`/api/createReport?${new URLSearchParams(queryString).toString()}`)
      .then(r => r.json())
      .then(d => setResponse(d))
  }

  const [record, setRecord] = useState({
    'Report': '',
    'Email': '',
    'Projects': id
  })

  const [response, setResponse] = useState(null)

  return (
    <section>
      <h3>Tell us what you know about this project</h3>
      <div className="flex flex-col mb-2 border">
        <label htmlFor="contact">What do you see?</label>
        <textarea value={record.Report} rows={4} className="w-full" onChange={e => setRecord({ ...record, Report: e.target.value })} />
      </div>
      <div className="flex flex-col mb-2 border">
        <label htmlFor="contact">Your phone or email</label>
        <input type="text" value={record.Email} name="contact" id="contact" onChange={e => setRecord({ ...record, Email: e.target.value })} />
      </div>
      <div className="flex items-center justify-around">
        {!response && <button onClick={() => handleClick(record, setResponse)} disabled={response !== null} className="my-3 mx-auto w-32">{"Send report"}</button>}
        {response && <div className="my-4">Thanks, we received your report!</div>}
      </div>
    </section>
  )
}

export default ProjectReport;