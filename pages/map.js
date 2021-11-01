import centroid from "@turf/centroid";
import Airtable from "airtable";
import { Map } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList";
import mapstyle from '../styles/mapstyle.json';

export async function getStaticProps(context) {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'the_geom', 'Slug', 'Last Modified'],
      sort: [{field: 'Last Modified', direction: 'desc'}]
    })
    .all();

  const projects = records.map((proj) => {
    let geometry = null;
    if (proj.get("the_geom")) {
      geometry = JSON.parse(proj.get("the_geom"))
    }
    return {
      type: "Feature",
      properties: {
        name: proj.get('Name'),
        slug: proj.get('Slug'),
        lastModified: proj.get('Last Modified')
      },
      geometry: geometry
    };
  });

  const centroids = records.map((proj) => {
    let geometry = null;
    if (proj.get("the_geom")) {
      geometry = JSON.parse(proj.get("the_geom"))
    }
    return {
      type: "Feature",
      properties: {
        name: proj.get('Name'),
        slug: proj.get('Slug'),
        lastModified: proj.get('Last Modified')
      },
      geometry: geometry ? centroid(geometry).geometry : null
    };
  });

  return {
    props: {
      projects,
      centroids
    },
  };
}

export default function ProjectMapPage(props) {

  let [theMap, setTheMap] = useState(null)

  let [visibleProjects, setVisibleProjects] = useState(props.projects)

  useEffect(() => {

    const accessToken = 'pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA';
    const detroitBbox = [-83.287803, 42.255192, -82.910451, 42.45023];
    let map = new Map({
      container: 'map',
      style: mapstyle,
      bounds: detroitBbox,
      accessToken: accessToken
    });

    map.on('load', () => {

      map.getSource("projects").setData({
        "type": "FeatureCollection",
        "features": props.projects
      })

      map.getSource("centroids").setData({
        "type": "FeatureCollection",
        "features": props.centroids
      })

      // map.addLayer({
      //   id: "projects-label",
      //   source: "projects",
      //   type: "symbol",
      //   paint: {
      //     "line-color": "red",
      //     "line-opacity": 1,
      //     "line-width": 2
      //   }
      // })

    })

    map.on('click', (e) => {
      console.log(e.point)
      let features = map.queryRenderedFeatures(e.point, {
        layers: ['projects-circle']
      })
      console.log(features)
      if(features.length > 0) {
        map.flyTo({
          center: features[0].geometry.coordinates,
          zoom: 16.5
        })
      }
    })

    map.on('moveend', () => {
      let visibleFeatures = map.queryRenderedFeatures({layers: ["projects-fill"]})

      // dedupe features based on slug
      let reducedFeatures = visibleFeatures.reduce((unique, item) => {
        if (unique.length > 0 && unique.map(p => p.properties.slug).includes(item.properties.slug)) {
          return unique
        }
        else {
          return [...unique, item]
        }
      }, [])

      setVisibleProjects(reducedFeatures)
    })

  }, [])

  return (
    <>
      <h2>Map of projects</h2>
      <div id='map' style={{ width: '100%', height: `50vh` }} />
      <ProjectList projects={visibleProjects.map(p => p.properties)} />
    </>
  )
}