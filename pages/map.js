import { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Map } from "mapbox-gl";
import Airtable from "airtable"

import 'mapbox-gl/dist/mapbox-gl.css';


export async function getStaticProps(context) {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'the_geom'],
    })
    .all();

    const projects = records.map((proj) => {
      console.log(proj)
      let geometry = null;
      if(proj.get("the_geom")) {
        geometry = JSON.parse(proj.get("the_geom"))
      }
      return {
        type: "Feature",
        properties: {
          name: proj.get('Name'),
        },
        geometry: geometry
      };
    });

    return {
      props: {
        projects,
      },
    };
  }

export default function MapPage( props ) {

  let [theMap, setTheMap] = useState(null)

  console.log(props)
  
  useEffect(() => {

    const accessToken = 'pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA';
    const detroitBbox = [-83.287803, 42.255192, -82.910451, 42.45023];
    let map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      bounds: detroitBbox,
      accessToken: accessToken
    });

    map.on('load', () => {
      map.addSource("projects", {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: props.projects
        }
      })

      map.addLayer({
        id: "projects-fill",
        source: "projects",
        type: "fill",
        paint: {
          "fill-color": "red",
          "fill-opacity": 0.25
        }
      })

      map.addLayer({
        id: "projects-line",
        source: "projects",
        type: "line",
        paint: {
          "line-color": "red",
          "line-opacity": 1,
          "line-width": 2
        }
      })

      map.addLayer({
        id: "projects-label",
        source: "projects",
        type: "symbol",
        paint: {
          "line-color": "red",
          "line-opacity": 1,
          "line-width": 2
        }
      })

    })

  }, [])

    return (
        <Layout>

        <div id='map' style={{width: '100%', height: `50vh`}} />
        </Layout>
    )
}