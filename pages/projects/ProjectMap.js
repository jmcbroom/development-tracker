import { useEffect, useState } from "react";
import { Map } from "mapbox-gl";
import bbox from '@turf/bbox';
import truncate from "@turf/truncate";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapstyle from '../../styles/mapstyle.json'
import centroid from "@turf/centroid";

const ProjectMap = ({ id, geom, editor, project }) => {

  let divStyle = {
    background: `rgba(100,0,0,0.2)`,
    padding: `1em`
  }

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
      accessToken: accessToken
    });

    map.on('load', () => {

      map.getSource("projects").setData(fc)
      map.getSource("centroids").setData(centroidFc)

    });
  }, [])

  let truncated, featureZeroGeom;
  if(theGeom && theGeom.features.length > 0) {
    truncated = truncate(theGeom, { precision: 5 })
    featureZeroGeom = truncated.features[0].geometry
  }

  return (
    <div style={divStyle}>
      <h3>Project map</h3>
      <div id="map" style={{ height: `90%`, minHeight: `300px`, width: `100%` }}></div>
    </div>
  )
}

export default ProjectMap;