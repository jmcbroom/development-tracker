import { useEffect, useState } from "react";
import { Map, NavigationControl } from "mapbox-gl";
import bbox from '@turf/bbox';
import truncate from "@turf/truncate";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapstyle from '../../styles/mapstyle.json'
import centroid from "@turf/centroid";
import PageSection from "../../components/PageSection";

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
        padding: 50
      },
      interactive: false,
      accessToken: accessToken
    });

    map.resize();

    map.addControl(new NavigationControl({showCompass: false}));

    map.on('load', () => {
      map.getSource("projects").setData(fc)
      map.getSource("centroids").setData(centroidFc)
      map.setLayoutProperty("projects-icon", "visibility", "none")
      map.setLayoutProperty("projects-label", "visibility", "none")
      map.setLayoutProperty("projects-circle", "visibility", "visible")

    });
  }, [])

  let truncated, featureZeroGeom;
  if(theGeom && theGeom.features.length > 0) {
    truncated = truncate(theGeom, { precision: 5 })
    featureZeroGeom = truncated.features[0].geometry
  }

  return (
    <PageSection title='Where is it?' padding={false}>
      <div id="map" className="min-h-map h-full"></div>
    </PageSection>
  )
}

export default ProjectMap;