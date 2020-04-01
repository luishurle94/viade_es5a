import { Milestone } from '@models';

const milestone = new Milestone('Hito 1', 'Hito de prueba', 10, 10, 43.3625, -5.8502, 1);
const milestone2 = new Milestone(null, 'Hito de prueba', 10, 10, 43.3625, -5.8502, 1);
const milestone3 = new Milestone('Hito 1', 'Hito de prueba', 10, 10, null, -5.8502, 1);
const milestone4 = new Milestone('Hito 1', 'Hito de prueba', 10, 10, 43.3625, null, 1);

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

describe.only('Get identifier', () => {
  test('should return true', async () => {
    expect(`Hito 1_43.3625_-5.8502` === milestone.getIdentifier()).toBe(true);
  });

  test('should be undefined', () => {
    expect(milestone2.getIdentifier()).toBe(undefined);
    expect(milestone3.getIdentifier()).toBe(undefined);
    expect(milestone4.getIdentifier()).toBe(undefined);
  })
});