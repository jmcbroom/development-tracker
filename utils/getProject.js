import centroid from "@turf/centroid";

export const getProjectObject = (proj) => {
  return {
    name: proj.get('Name'),
    slug: proj.get('Slug'),
    lastModified: proj.get('Last Modified'),
    address: proj.get('Address') || null,
    uses: proj.get('Uses') ? proj.get('Uses').join(", ") : null,
    status: proj.get('Status') || null
   };
}

export const getProjectGeoJSON = (proj, center=false) => {
  let geometry = null;

  if (proj.get("the_geom") && !center) {
    geometry = JSON.parse(proj.get("the_geom"))
  }
  if (proj.get("the_geom") && center) {
    geometry = centroid(JSON.parse(proj.get("the_geom"))).geometry
  }
  return {
    type: "Feature",
    properties: getProjectObject(proj),
    geometry: geometry
  };
}