import { useEffect, useState } from "react";
import { Map } from "mapbox-gl";
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import bbox from '@turf/bbox';
import truncate from "@turf/truncate";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const ProjectMap = ({ id, geom }) => {

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
        properties: {}
      }
    ] : []
  }

  let [theGeom, setTheGeom] = useState(fc)

  console.log(fc)

  useEffect(() => {
    const accessToken = 'pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA';
    const detroitBbox = [-83.287803, 42.255192, -82.910451, 42.45023];
    let map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      bounds: bbox(JSON.parse(geom)),
      fitBoundsOptions: {
        padding: 100
      },
      accessToken: accessToken
    });

    let Draw = new MapboxDraw({
      defaultMode: geom ? 'simple_select' : 'draw_polygon',
      displayControlsDefault: false
    });

    map.addControl(Draw, 'top-left');

    map.on('load', () => {

      if(fc.features.length > 0) {
        Draw.set(fc)
      }
      map.on("draw.create", e => {
        let geometry = Draw.getAll();
        setTheGeom(geometry);
        if (geometry.features[0].geometry.type === 'Polygon') {
          map.fitBounds(bbox(geometry), { padding: 20, maxZoom: 17 });
        }
      });
      map.on("draw.update", e => {
        let geometry = Draw.getAll();
        setTheGeom(geometry)
      })

    });
  }, [])

  console.log(theGeom)
  let truncated, featureZeroGeom;
  if(theGeom && theGeom.features.length > 0) {
    truncated = truncate(theGeom, { precision: 5 })
    featureZeroGeom = truncated.features[0].geometry
  }

  return (
    <div style={divStyle}>
      <h3>Project map</h3>
      <div id="map" style={{ height: 400 }}></div>
      {theGeom && theGeom.features.length > 0 && <button onClick={() => fetch(`/api/updateRecord?id=${id}&column=the_geom&value=${JSON.stringify(featureZeroGeom)}&table=Projects`)}>Edit project boundaries</button>}
    </div>
  )
}

export default ProjectMap;