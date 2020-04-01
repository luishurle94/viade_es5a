/**
* @param {any} base
* @param {Integer} lat 
* @param {Integer} lon 
*/
export const createMarker = (base, lat, lon) => {
  if (base) {
    base.features = [...base.features, createPoint(lat, lon)];
  }
  return base;
};

export const createPoint = (lat, lon) => {
  return {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        lon,
        lat
      ]
    }
  }
};

/**
* @param {any} base
* @param {Integer} lat 
* @param {Integer} lon 
*/
export const createLine = (base, lat, lon) => {
  if (base) {
    base.features[0].geometry.coordinates.push([lon, lat]);
  }
  return base;
};


export const getBase = () => {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
          ]
        }
      }
    ]
  }
};