import { FriendFactory } from '@services/factories';

describe.only('Transformations', () => {
  test('transform object', async () => {

    const friend = {
      webId: "https://jaluma.inrupt.net/public/viade/1993149598/1993149598.ttl",
      name: "Prueba120",
      image: "Esto es una prueba",
    };

    const result = FriendFactory.create(friend);

    expect(friend.webId === result.webId).toBe(true);
    expect(friend.name === result.name).toBe(true);
    expect(friend.image === result.image).toBe(true);
  });

  test('transform object', async () => {

    const friend = {
    };

    const result = FriendFactory.create(friend);

    expect(result).toBeTruthy();
  });

  test('transform undefined', async () => {
    const result = FriendFactory.create();

    expect(result).toBeUndefined()
  });

  test('transform null', async () => {
    const friend = null;
    const result = FriendFactory.create(friend);

    expect(result).toBeUndefined()
  });
});