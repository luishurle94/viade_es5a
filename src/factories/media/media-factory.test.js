import { MediaFactory } from '@factories';

describe.only('Transformations', () => {
  test('transform object', async () => {

    const media = {
      webId: "https://jaluma.inrupt.net/public/viade/1993149598/1993149598.ttl",
      href: "Prueba120",
      body: "asdag432654 sdfgsdzdfdsfsdf",
      createdAt: "Prueba120",
      createdBy: "https://jaluma.inrupt.net/",
      mimeType: "image/jpg",
    };

    const result = MediaFactory.create(media);

    expect(media.webId === result.webId).toBe(true);
    expect(media.href === result.href).toBe(true);
    expect(media.body === result.body).toBe(true);
    expect(media.createdAt === result.createdAt).toBe(true);
    expect(media.createdBy === result.createdBy).toBe(true);
    expect(media.mimeType === result.mimeType).toBe(true);

  });

  test('transform object', async () => {

    const media = {
    };

    const result = MediaFactory.create(media);

    expect(result).toBeTruthy();
  });

  test('transform undefined', async () => {
    const result = MediaFactory.create();

    expect(result).toBeUndefined()
  });

  test('transform null', async () => {
    const media = null;
    const result = MediaFactory.create(media);

    expect(result).toBeUndefined()
  });
});