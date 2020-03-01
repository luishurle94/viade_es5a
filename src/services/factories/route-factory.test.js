import { RouteFactory } from '../factories';

describe.only('Transformations', () => {
  test('transform object', async () => {

    const route = {
      webId: "https://jaluma.inrupt.net/public/viade/1993149598.ttl",
      name: "Prueba120",
      description: "Esto es una prueba",
      distance: "6",
      slope: "10",
      rank: "10",
      createdBy: "https://jaluma.inrupt.net/profile/card#me",
      createdAt: "1583017272006",
    };

    const result = RouteFactory.create(route);

    expect(route.name === result.name).toBe(true);
    expect(route.description === result.description).toBe(true);
    expect(route.distance === result.distance).toBe(true);
    expect(route.slope === result.slope).toBe(true);
    expect(route.rank === result.rank).toBe(true);
    expect(route.createdBy === result.createdBy).toBe(true);
    expect(route.createdAt === result.createdAt).toBe(true);

  });
});