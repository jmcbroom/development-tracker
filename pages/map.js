import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Airtable from "airtable";
import { GeolocateControl, Map, NavigationControl } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList";
import mapstyle from '../styles/mapstyle.json';
import { getProjectGeoJSON } from "../utils/getProject";
import Link from 'next/link'
import Head from 'next/head'
import { siteTitle } from "../components/layout";

export async function getStaticProps(context) {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'the_geom', 'Slug', 'Last Modified', 'Address', 'Uses'],
      sort: [{ field: 'Last Modified', direction: 'desc' }],
      filterByFormula: process.env.NODE_ENV === 'production' ? process.env[process.env.FILTER_VAR] : process.env.DEV_RECORD_FILTER
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
  let [theGeocoder, setTheGeocoder] = useState(null)

  let [visibleProjects, setVisibleProjects] = useState(props.projects)

  let [result, setResult] = useState(null)

  const router = useRouter();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA';
    const detroitBbox = [-83.287803, 42.255192, -82.910451, 42.45023];
    let map = new Map({
      container: 'map',
      style: mapstyle,
      bounds: detroitBbox
    });

    map.addControl(new NavigationControl())

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: `Search for an address in Detroit`,
      bbox: [-84, 42, -82, 43],
      countries: 'us'
    });

    geocoder.addTo("#geocoder")

    setTheGeocoder(geocoder)

    // Add geocoder result to container.
    geocoder.on('result', (e) => {
      setResult(e.result)
    });

    // Clear results container when search is cleared.
    geocoder.on('clear', () => {
      setResult(null)
    });

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

      map.resize()

      setTheMap(map)

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

  useEffect(() => {
    if(theMap && result) {
      theMap.flyTo({
        center: result.geometry.coordinates,
        zoom: 15
      })
    }

  }, [result])

  return (
    <>
          <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{`Detroit Development Tracker: Map of all projects`}</title>
      <meta
        name="description"
        content="Tracking development in Detroit, Michigan."
        key="description"
      />
      <meta property="og:title" content={siteTitle} key="title"/>
      <meta property="og:description" content="Use the Detroit Development Tracker to look up information about real estate development in the city."/>
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

      <div className="max-w-xl mx-auto">
        <h2>
          Map of Detroit development projects
        </h2>
        <p className="pt-4 md:pt-6 pb-2">
        Explore the map or enter an address to see developments in Detroit.
        <span className="block">Click on a project to see more details.</span> 
        </p>
        <span className="leading-7 font-light bg-highlight mb-4 text-sm"> See something missing? <Link href={`/submit-a-tip`}>Send a tip</Link> to help track Detroit development.</span>
      </div>
      <div id="geocoder" className='my-7 max-w-xl mx-auto'></div>
      <div id='map' className="max-w-6xl mx-auto border-1 border-black h-128" />
      <ProjectList projects={visibleProjects.map(p => p.properties)} title="All development projects in the current map view" />
    </>
  )
}