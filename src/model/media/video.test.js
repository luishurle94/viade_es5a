import { Video } from '@models';

const video = new Video('WebIdPrueba', 'hrefDePrueba', 'Imagen de prueba');

describe.only('Create a new image', () => {

  test('should create succesfully', async () => {
    expect(video.webId === 'WebIdPrueba').toBe(true);
    expect(video.href === 'hrefDePrueba').toBe(true);
    expect(video.alt === 'Imagen de prueba').toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Video();
    expect(fail.webId).toBe(undefined);
    expect(fail.href).toBe(undefined);
    expect(fail.alt).toBe(undefined);
  });
});