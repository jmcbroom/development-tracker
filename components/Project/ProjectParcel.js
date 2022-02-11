import Link from "next/link";
import { useEffect, useState } from "react";
import AttributeTable from '../../components/AttributeTable';
import PageSection from "../../components/PageSection";

const ProjectParcel = ({ parcelId }) => {

  let [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://apis.detroitmi.gov/assessments/parcel/${parcelId}/`)
      .then(r => r.json())
      .then(d => {
        let attributes = [
          {
            title: 'Parcel ID',
            value: parcelId
          },
          {
            title: 'Taxpayer',
            value: d.taxpayer1
          },
          {
            title: 'Taxpayer address',
            value: `${d.taxpaddr} ${d.taxpcity} ${d.taxpstate} ${d.taxpzip}`
          },
          {
            title: 'Dimensions',
            value: `${d.frontage} ft by ${d.depth} ft`
          },
          {
            title: 'Zoning',
            value: <Link href={`https://zoning.det.city/zone/${d.zoning}/`}><a target="_blank">{d.zoning}</a></Link>
          }
        ]
        setData(attributes)
      })
  }, [])

  return (
    <PageSection title={`What are the property details?`}>
      {data &&
        <AttributeTable attributes={data} />
      }
      <div className="font-dmmono mt-6 mb-10 text-xs">
        {`Source: `}
        <Link href={`https://cityofdetroit.github.io/parcel-viewer/${parcelId}/`}>
          <a target="_blank">Open Data Portal</a>
        </Link>
      </div>
    </PageSection>
  )
}

export default ProjectParcel;