import { RouteFactory } from '@factories';

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
      messages: [],
      milestones: [],
      media: []
    };

    const result = RouteFactory.create(route);

    expect(route.name === result.name).toBe(true);
    expect(route.description === result.description).toBe(true);
    expect(route.distance === result.distance).toBe(true);
    expect(route.slope === result.slope).toBe(true);
    expect(route.rank === result.rank).toBe(true);
    expect(route.createdBy === result.createdBy).toBe(true);
    expect(route.createdAt === result.createdAt).toBe(true);
    expect(route.messages.length === result.messages.length).toBe(true);
    expect(route.milestones.length === result.milestones.length).toBe(true);
    expect(route.media.length === result.media.length).toBe(true);
  });

  test('transform object', async () => {

    const route = {
    };

    const result = RouteFactory.create(route);

    expect(result).toBeTruthy();
  });

  test('transform undefined', async () => {
    const result = RouteFactory.create();

    expect(result).toBeUndefined()
  });

  test('transform null', async () => {
    const route = null;
    const result = RouteFactory.create(route);

    expect(result).toBeUndefined()
  });
});