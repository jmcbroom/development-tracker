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
    <div className="max-w-xl submit-form mx-auto">
      <h2 className="mb-9">Tell us what you know about this project</h2>
      <div className="flex flex-col mb-2 border">
        <label htmlFor="contact">What do you see?</label>
        <textarea value={record.Report} rows={4} className="w-full" onChange={e => setRecord({ ...record, Report: e.target.value })} />
      </div>
      <div className="flex flex-col mb-2 border">
        <label htmlFor="contact">What's your email? (optional)</label>
        <input type="text" value={record.Email} name="contact" id="contact" onChange={e => setRecord({ ...record, Email: e.target.value })} />
      </div>
      <div className="flex items-center justify-around">
        {!response && <button onClick={() => handleClick(record, setResponse)} disabled={response !== null} className="my-3 mx-auto w-32">{"Submit info"}</button>}
        {response && <div className="my-4">Thanks, we received your report!</div>}
      </div>
    </div>
  )
}

export default ProjectReport;