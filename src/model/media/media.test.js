import { Media } from '@models';
const date = new Date();
const img = new Media('http://example.com/picture.jpg', 'esto_Es_un_binary', date, 'me', 'image/jpg');
const img2 = new Media(null, 'esto_Es_un_binary', date, 'me', 'image/jpg');
const img3 = new Media('http://example.com/picture.jpg', 'esto_Es_un_binary', date, null, 'image/jpg');
const img4 = new Media('http://example.com/picture.jpg', 'esto_Es_un_binary', date, 'me');

describe.only('Create a new image', () => {

  test('should create succesfully', async () => {
    expect(img.webId === '').toBe(true);
    expect(img.href === 'http://example.com/picture.jpg').toBe(true);
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
      expect(`http://example.com/picture.jpg_me_image/jpg`).toBe(img.getIdentifier());
    });

    test('should be undefined', () => {
      expect(img2.getIdentifier()).toBe(undefined);
      expect(img3.getIdentifier()).toBe(undefined);
      expect(img4.getIdentifier()).toBe(undefined);
    })
  });

  describe.only('Get gallery object', () => {
    test('should return object', async () => {
      expect(img.galleryObject).toStrictEqual({
        alt: `${date.toISOString()} - me`,
        previewImageSrc: "http://example.com/picture.jpg",
        thumbnailImageSrc: "http://example.com/picture.jpg",
        title: "picture.jpg"}
        );
    });
  });