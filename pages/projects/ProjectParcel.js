import { useEffect, useState } from "react";
import AttributeTable from '../../components/AttributeTable';

const ProjectParcel = ({ parcelId }) => {

  let divStyle = {
    background: `rgba(0,100,0,0.2)`,
    padding: `1em`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`
  }

  let [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://apis.detroitmi.gov/assessments/parcel/${parcelId}/`)
      .then(r => r.json())
      .then(d => {
        let attributes = [
          {
            title: 'Owner',
            value: d.taxpayer1
          },
          {
            title: 'Owner address',
            value: `${d.taxpaddr} ${d.taxpcity} ${d.taxpstate} ${d.taxpzip}`
          },
          {
            title: 'Dimensions',
            value: `${d.frontage} ft x ${d.depth} ft`
          },
          {
            title: 'Zoning',
            value: <a href={`https://zoning.det.city/zone/${d.zoning}/`}>{d.zoning}</a>
          }
        ]
        setData(attributes)
      })
  }, [])

  return (
    <section>
      <h3>Parcel: {parcelId}</h3>
      {data &&
        <AttributeTable attributes={data} />
      }
      <pre>Source: <a href={`https://cityofdetroit.github.io/parcel-viewer/${parcelId}/`}>Open Data Portal</a></pre>
    </section>
  )
}

export default ProjectParcel;