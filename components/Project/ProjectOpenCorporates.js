import { useEffect, useState } from "react";

const ProjectOpenCorporates = ({ openCorporatesId }) => {

  let divStyle = {
    background: `rgba(0,100,0,0.2)`,
    padding: `1em`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`
  }

  let [data, setData] = useState(null)

  // useEffect(() => {
  //   fetch(`https://apis.detroitmi.gov/assessments/parcel/${parcelId}/`)
  //     .then(r => r.json())
  //     .then(d => {
  //       setData(d)
  //     })
  // }, [])

  return (
    <section>
      <h3>Corporate owner: {openCorporatesId}</h3>
      {/* {data &&
      <div>
        <p>
          This parcel is owned by: 
          </p>
          <p>
          {data.taxpayer1}
          </p>
        <p>{`The owner's address is:`}
        </p>
          <p>
          {data.taxpaddr} {data.taxpcity} {data.taxpstate} {data.taxpzip}
          </p>
        </div>
      }
      <pre>Source: <a href={`https://cityofdetroit.github.io/parcel-viewer/${parcelId}/`}>Open Data Portal</a></pre> */}
    </section>
  )
}

export default ProjectOpenCorporates;