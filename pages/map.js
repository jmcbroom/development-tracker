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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export async function getStaticProps(context) {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'the_geom', 'Slug', 'Last Modified', 'Address', 'Uses'],
      sort: [{ field: 'Last Modified', direction: 'desc' }],
      filterByFormula: process.env.NODE_ENV === 'production' ? process.env.RECORD_FILTER : process.env.DEV_RECORD_FILTER
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
    console.log(result)

    if(theMap && result) {
      theMap.flyTo({
        center: result.geometry.coordinates,
        zoom: 15
      })
    }

  }, [result])

  return (
    <>
      <div className="max-w-xl mx-auto pb-20">
        <h2>
          Map of Detroit development projects
        </h2>
        <p className="pt-4">
          Explore the map to see developments citywide, in one area of Detroit or near you. Click on any project for more details, and scroll to see a list of projects in the map view.
        </p>
      </div>
      <div 
        style={{background: `rgba(242, 246, 255, 1)`, height: 498}} 
        className="pt-15">
        <h2 className="text-center">Lorem ipsum subheadline</h2>
        <div className="flex items-center max-w-xl mx-auto mt-8">
          {/* <div className='border-1 border-black flex items-center p-2 bg-white w-full'> */}
            {/* <FontAwesomeIcon icon={faSearch} className='h-4 mr-4 bg-white' style={{color: `rgba(128, 163, 251, 1)`}} /> */}
            <div id="geocoder"></div>
          {/* </div> */}
          <button className="border-1 border-black p-2 border-l-0 bg-seafoam font-dmmono px-8">
            Search
          </button>
        </div>
      </div>
      <div id='map' className="max-w-5xl mx-auto border-1 border-black h-128 -mt-71" />
      <ProjectList projects={visibleProjects.map(p => p.properties)} title="Projects on the map" />
    </>
  )
}