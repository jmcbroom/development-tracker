import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import bbox from '@turf/bbox';
import truncate from "@turf/truncate";
import { Map } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";

const ProjectMapEditor = ({ id, geom }) => {

  const handleClick = (id, geom, setResponse) => {
    fetch(`/api/updateRecord?id=${id}&column=the_geom&value=${JSON.stringify(geom)}&table=Projects`)
      .then(r => r.json())
      .then(d => setResponse(d))
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
  let [response, setResponse] = useState(null)
  let [different, setDifferent] = useState(false)

  useEffect(() => {
    const accessToken = 'pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA';
    const detroitBbox = [-83.287803, 42.255192, -82.910451, 42.45023];
    let map = new Map({
      container: 'map',
      style: 'mapbox://styles/jmcbroom/cktr8i2jc1vby19qdjbtlvhwg',
      bounds: geom ? bbox(JSON.parse(geom)) : detroitBbox,
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
        setDifferent(true)
      })

    });
  }, [])

  let truncated, featureZeroGeom;
  if(theGeom && theGeom.features.length > 0) {
    truncated = truncate(theGeom, { precision: 5 })
    featureZeroGeom = truncated.features[0].geometry
  }

  return (
    <section className="bg-red-100">
      <h3>Project map (editable)</h3>
      <div id="map" className="h-96"></div>
      {
        theGeom && 
        different &&
        theGeom.features.length > 0 && 
        !response &&
        <button 
          onClick={() => handleClick(id, featureZeroGeom, setResponse)}>
            Edit project boundaries
        </button>
      }
      {
        response &&
        <span>You edited the geometry.</span>
      }
    </section>
  )
}

export default ProjectMapEditor;