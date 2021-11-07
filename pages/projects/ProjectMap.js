import { useEffect, useState } from "react";
import { Map, NavigationControl } from "mapbox-gl";
import bbox from '@turf/bbox';
import truncate from "@turf/truncate";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapstyle from '../../styles/mapstyle.json'
import centroid from "@turf/centroid";

const ProjectMap = ({ id, geom, editor, project }) => {

  let fc = {
    type: "FeatureCollection",
    features: geom ? [
      {
        type: "Feature",
        geometry: JSON.parse(geom),
        properties: {...project}
      }
    ] : []
  }

  let centroidFc = {
    type: "FeatureCollection",
    features: geom ? [
      {
        type: "Feature",
        geometry: centroid(JSON.parse(geom)).geometry,
        properties: {...project}
      }
    ] : []
  }

  let [theGeom, setTheGeom] = useState(fc)

  useEffect(() => {
    const accessToken = 'pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA';
    const detroitBbox = [-83.287803, 42.255192, -82.910451, 42.45023];
    let map = new Map({
      container: 'map',
      style: mapstyle,
      bounds: geom ? bbox(JSON.parse(geom)) : detroitBbox,
      fitBoundsOptions: {
        padding: 100
      },
      interactive: false,
      accessToken: accessToken
    });

    map.addControl(new NavigationControl());

    map.on('load', () => {

      map.getSource("projects").setData(fc)
      map.getSource("centroids").setData(centroidFc)
      map.setLayoutProperty("projects-icon", "visibility", "none")
      map.setLayoutProperty("projects-label", "visibility", "none")
      map.setLayoutProperty("projects-circle", "visibility", "none")

    });
  }, [])

  let truncated, featureZeroGeom;
  if(theGeom && theGeom.features.length > 0) {
    truncated = truncate(theGeom, { precision: 5 })
    featureZeroGeom = truncated.features[0].geometry
  }

  return (
    <div className="p-3 bg-gray-100">
      <h3>Map</h3>
      <div id="map" className="h-96"></div>
    </div>
  )
}

export default ProjectMap;