import centroid from "@turf/centroid";
import Airtable from "airtable";
import { Map, GeolocateControl, NavigationControl, mapboxgl } from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
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
      sort: [{field: 'Last Modified', direction: 'desc'}],
      filterByFormula: `{Publish} = 1`
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

    map.addControl(new NavigationControl())

    const geocoder = new MapboxGeocoder({
        accessToken: accessToken,
        mapboxgl: mapboxgl,
        placeholder: `Search for an address in Detroit`,
        bbox: [-84, 42, -82, 43]
    });
    
    map.addControl(geocoder, 'top-left');

    map.addControl(new GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
    )

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
      <h2 className="m-0 bg-gray-200 py-3 px-3">Map of projects</h2>
      <div id='map' className="w-auto h-96" />
      <ProjectList projects={visibleProjects.map(p => p.properties)} />
    </>
  )
}