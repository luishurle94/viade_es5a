import { Milestone, Image, Video } from '@models';

const milestone = new Milestone('Hito 1', 'Hito de prueba', 10, 10, 43.3625, -5.8502, 1);

describe.only('Create a new milestone', () => {

  test('should create succesfully', async () => {
    expect(milestone.webId === '').toBe(true);
    expect(milestone.name === 'Hito 1').toBe(true);
    expect(milestone.description === 'Hito de prueba').toBe(true);
    expect(milestone.distance === 10).toBe(true);
    expect(milestone.slope === 10).toBe(true);
    expect(milestone.latitude === 43.3625).toBe(true);
    expect(milestone.longitude === -5.8502).toBe(true);
    expect(milestone.order === 1).toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Milestone();
    expect(fail.name).toBe(undefined);
    expect(fail.description).toBe(undefined);
    expect(fail.distance).toBe(undefined);
    expect(fail.slope).toBe(undefined);
    expect(fail.latitude).toBe(undefined);
    expect(fail.longitude).toBe(undefined);
    expect(fail.order).toBe(undefined);
  });
});

describe.only('Link image', () => {
  test('should link successfully', async () => {
    expect(milestone.images.length === 0).toBe(true);
    milestone.linkImge(new Image());
    expect(milestone.images.length === 1).toBe(true);
  });

  test('should not link successfully', () => {
    milestone.linkImge();
    expect(milestone.images.length === 1).toBe(true);    
  })
});

describe.only('Link video', () => {
  test('should link successfully', async () => {
    expect(milestone.videos.length === 0).toBe(true);
    milestone.linkVideo(new Video());
    expect(milestone.videos.length === 1).toBe(true);
  });

  test('should not link successfully', () => {
    milestone.linkVideo();
    expect(milestone.videos.length === 1).toBe(true);    
  })
});

describe.only('Get identifier', () => {
  test('should return true', async () => {
    expect(`Hito 1_43.3625_-5.8502` === milestone.getIdentifier()).toBe(true);
  });
});