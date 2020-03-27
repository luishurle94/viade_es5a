import { Media } from '@models';
const date = new Date();
const img = new Media('href', 'esto_Es_un_binary', date, 'me', 'image/jpg');

describe.only('Create a new image', () => {

  test('should create succesfully', async () => {
    expect(img.webId === '').toBe(true);
    expect(img.href === 'href').toBe(true);
    expect(img.body === 'esto_Es_un_binary').toBe(true);
    expect(img.createdAt === date.toISOString()).toBe(true);
    expect(img.createdBy === 'me').toBe(true);
    expect(img.mimeType === 'image/jpg').toBe(true);
  });

  test('should return undefined entity', () => {
    const fail = new Image();
    expect(fail.href).toBe(undefined);
    expect(fail.body).toBe(undefined);
    expect(fail.createdAt).toBe(undefined);
    expect(fail.createdBy).toBe(undefined);
    expect(fail.mimeType).toBe(undefined);
  });
});

describe.only('Get identifier', () => {
    test('should return true', async () => {
      expect(`href_me_image/jpg` === img.getIdentifier()).toBe(true);
    });
  });