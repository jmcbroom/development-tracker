import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Airtable from "airtable";
import { GeolocateControl, Map, mapboxgl, NavigationControl } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList";
import mapstyle from '../styles/mapstyle.json';
import { getProjectGeoJSON } from "../utils/getProject";

export async function getStaticProps(context) {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  console.log(process.env.RECORD_FILTER)
  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'the_geom', 'Slug', 'Last Modified', 'Address', 'Uses'],
      sort: [{ field: 'Last Modified', direction: 'desc' }],
      filterByFormula: process.env.RECORD_FILTER
    })
    .all();

  const projects = records.map((proj) => getProjectGeoJSON(proj, false));

  const centroids = records.map((proj) => getProjectGeoJSON(proj, true));

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

  const router = useRouter();

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
      bbox: [-84, 42, -82, 43],
      mapboxgl: mapboxgl
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
      let features = map.queryRenderedFeatures(e.point, {
        layers: ['projects-circle']
      })
      let labels = map.queryRenderedFeatures(e.point, {
        layers: ['projects-label']
      })

      if (labels.length > 0) {
        router.push(`/projects/${labels[0].properties.slug}`)
      }
      if (features.length > 0) {
        map.flyTo({
          center: features[0].geometry.coordinates,
          zoom: 16.5
        })
      }
    })

    map.on('moveend', () => {
      let visibleFeatures = map.queryRenderedFeatures({ layers: ["projects-circle", "projects-label"] })

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
      <section>
        <h2>
          Map of Detroit development projects
        </h2>
        <p>
          Explore the map to see developments citywide, in one area of Detroit or near you. Click on any project for more details, and scroll to see a list of projects in the map view.
        </p>
      </section>
      <div id='map' className="w-auto h-96" />
      <ProjectList projects={visibleProjects.map(p => p.properties)} title="Projects on the map" />
    </>
  )
}