import { GeoJsonHelper } from "@utils";

describe.only('Generate point', () => {
  test('should create a point geojson object', async () => {
    const obj = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          -11
        ]
      }
    };
    expect(obj.geometry.coordinates[0] === GeoJsonHelper.createPoint(-11, 10).geometry.coordinates[0]).toBe(true);
    expect(obj.geometry.coordinates[1] === GeoJsonHelper.createPoint(-11, 10).geometry.coordinates[1]).toBe(true);
  });
});

describe.only('Generate base', () => {
  test('should create a geojson base object', async () => {
    const obj = {
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
    };
    expect(GeoJsonHelper.getBase()).toStrictEqual(obj);
  });
});

