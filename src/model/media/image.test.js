import { Image } from '@models';

const img = new Image('WebIdPrueba', 'hrefDePrueba', 'Imagen de prueba');

describe.only('Create a new image', () => {

  test('should create succesfully', async () => {
    expect(img.webId === 'WebIdPrueba').toBe(true);
    expect(img.href === 'hrefDePrueba').toBe(true);
    expect(img.alt === 'Imagen de prueba').toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Image();
    expect(fail.webId).toBe(undefined);
    expect(fail.href).toBe(undefined);
    expect(fail.alt).toBe(undefined);
  });
});