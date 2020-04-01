import 'jest';

import * as SolidHelper from './../../../test/__mocks__/solid-helper';
import auth from './../../../test/__mocks__/solid-auth-client';

import { Route, Milestone, Media } from '@models';

jest.mock('../../solid/solid-helper');
jest.mock('solid-auth-client');

const route = new Route('Esto es una prueba', 'Descripcion', 5, 10, 10, "javier", new Date());
const route2 = new Route(undefined, 'Descripcion', 5, 10, 10, "javier", new Date());
const route3 = new Route('Esto es una prueba', undefined, 5, 10, 10, "javier", new Date());
const route4 = new Route('Esto es una prueba', 'Descripcion', 5, 10, 10, undefined, new Date());

describe.only('Create a new route', () => {
  test('should create sucessfully', async () => {
    expect(route.webId === '').toBe(true);
    expect(route.name === 'Esto es una prueba').toBe(true);
    expect(route.description === 'Descripcion').toBe(true);
    expect(route.distance === 5).toBe(true);
    expect(route.slope === 10).toBe(true);
    expect(route.rank === 10).toBe(true);
    expect(route.createdBy === 'javier').toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Route();
    expect(fail.name).toBe(undefined);
    expect(fail.description).toBe(undefined);
    expect(fail.distance).toBe(undefined);
    expect(fail.slope).toBe(undefined);
    expect(fail.rank).toBe(undefined);
    expect(fail.createdBy).toBe(undefined);
  });

});

describe.only('Link milestone', () => {
  test('should link sucessfully', async () => {
    expect(route.milestones.length === 0).toBe(true);
    route.linkMilestone(new Milestone());
    expect(route.milestones.length === 1).toBe(true);
  });

  test('not should link sucessfully', () => {
    route.linkMilestone();
    expect(route.milestones.length === 1).toBe(true);
  });

});

describe.only('Link comment', () => {
  test('should link sucessfully', async () => {
    expect(route.messages.length === 0).toBe(true);
    route.linkComment(new Comment());
    expect(route.messages.length === 1).toBe(true);
  });

  test('not should link sucessfully', () => {
    route.linkComment();
    expect(route.messages.length === 1).toBe(true);
  });

});

describe.only('Link media', () => {
  test('should link successfully', async () => {
    expect(route.media.length === 0).toBe(true);
    route.linkMedia(new Media());
    expect(route.media.length === 1).toBe(true);
  });

  test('should not link successfully', () => {
    route.linkMedia();
    expect(route.media.length === 1).toBe(true);    
  })
});

describe.only('Create geojson', () => {
  test('should create a geojson object empty', async () => {
    const r = new Route();
    expect(await r.getGeoJson()).toStrictEqual({
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
    })
  });

  test('should create a geojson object with points', async () => {
    const r = new Route('Esto es una prueba2', 'Descripcion', 5, 10, 10, "javier");
    r.milestones.push('1574320256') //soy_un_hito
    r.milestones.push('1559287730')//soy_un_hito_2
    const geojson = await r.getGeoJson();
    expect(geojson.features[0].geometry.coordinates).toStrictEqual([["10", "-10"], ["11", "-11"]])
    expect(geojson.features[1].geometry.coordinates).toStrictEqual(["10", "-10"])
    expect(geojson.features[2].geometry.coordinates).toStrictEqual(["11", "-11"])
    expect(geojson.features[3]).toBeUndefined()
  });
});

describe.only('Get identifier', () => {
  test('should return true', async () => {
    expect(`Esto es una prueba_Descripcion_javier` === route.getIdentifier()).toBe(true);
  });

  test('should be undefined', () => {
    expect(route2.getIdentifier()).toBe(undefined);
    expect(route3.getIdentifier()).toBe(undefined);
    expect(route4.getIdentifier()).toBe(undefined);
  })
});

describe.only('Get milestone objects', () => {
  test('should return ', async () => {
    expect(`Esto es una prueba_Descripcion_javier` === route.getIdentifier()).toBe(true);
  });
});


describe.only('Refresh media', () => {
  test('should download successfully', async () => {
    expect(route.mediaObject.length).toBe(0);
    route.messages.push('soy_una_imagen')
    await route.refreshMedia();
    expect(route.mediaObject.length).toBeGreaterThan(0);
  });

  test('not exist media file', async () => {
    const l = route.messagesObject.length;
    await route.refreshMedia()
    expect(route.mediaObject.length).toBeGreaterThan(0);  
  })
});


describe.only('Refresh comment', () => {
  test('should download successfully', async () => {
    expect(route.messagesObject.length).toBe(0);
    route.messages.push('soy_una_imagen')
    await route.refreshComments();
    expect(route.messagesObject.length).toBeGreaterThan(0);
  });

  test('not exist media file', async () => {
    const l = route.messagesObject.length;
    await route.refreshComments()
    expect(route.messagesObject.length).toBe(l);    
  })
});