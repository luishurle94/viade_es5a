import { Route } from '@models'
import { Milestone } from '..';

const route = new Route('Esto es una prueba', 'Descripcion', 5, 10, 10, "javier");
describe.only('Create a new route', () => {
  test('should create sucessfully', async () => {
    expect(route.webId === '').toBe(true);
    expect(route.name === 'Esto es una prueba').toBe(true);
    expect(route.description === 'Descripcion').toBe(true);
    expect(route.distance === 5).toBe(true);
    expect(route.slope === 10).toBe(true);
    expect(route.rank === 10).toBe(true);
    expect(route.createdBy == 'javier').toBe(true);
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
    expect(route.milestones.length == 0).toBe(true);
    route.linkMilestone(new Milestone());
    expect(route.milestones.length == 1).toBe(true);
  });

  test('not should link sucessfully', () => {
    route.linkMilestone();
    expect(route.milestones.length == 1).toBe(true);
  });

});

describe.only('Link comment', () => {
  test('should link sucessfully', async () => {
    expect(route.messages.length == 0).toBe(true);
    route.linkComment(new Comment());
    expect(route.messages.length == 1).toBe(true);
  });

  test('not should link sucessfully', () => {
    route.linkComment();
    expect(route.messages.length == 1).toBe(true);
  });

});

describe.only('Create geojson', () => {
  test('should create a geojson object', async () => {
  });

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
    expect(obj.geometry.coordinates[0] === route.createPoint(-11, 10).geometry.coordinates[0]).toBe(true);
    expect(obj.geometry.coordinates[1] === route.createPoint(-11, 10).geometry.coordinates[1]).toBe(true);
  });
});

describe.only('Get identifier', () => {
  test('should return true', async () => {
    expect(`Esto es una prueba_javier` === route.getIdentifier()).toBe(true);
  });
});