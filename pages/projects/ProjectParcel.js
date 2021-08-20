import { useEffect, useState } from "react";

const ProjectParcel = ({ parcelId }) => {

  let divStyle = {
    background: `rgba(0,100,0,0.2)`,
    padding: `1em`
  }

  let [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://apis.detroitmi.gov/assessments/parcel/${parcelId}/`)
      .then(r => r.json())
      .then(d => {
        setData(d)
      })
  }, [])

  return (
    <div style={divStyle}>
      <h2>Parcel: {parcelId}</h2>
      {data &&
      <>
        <p>
          This parcel is owned by: 
          </p>
          <pre>
          {data.taxpayer1}
          </pre>
        <p>The owner's address is: 
        </p>
          <pre>
          {data.taxpaddr} {data.taxpcity} {data.taxpstate} {data.taxpzip}
          </pre>
        </>
      }
    </div>
  )
}

export default ProjectParcel;