import 'jest';

import * as SolidHelper from './../../test/__mocks__/solid-helper';

import routeShape from '@contexts/route-shape.json';
import * as SolidAdapter from "./solid-adapter";
jest.mock('./solid-helper');

describe.only('Create file', () => {
  test('create new file', async () => {
    const res = await SolidAdapter.create({name: "soyUnaPrueba", getIdentifier: () => "soy_un_id"}, routeShape, true, "child", "parent", "parentFilename")
    expect(res.added).toBe(true);
  });

  test('create duplicate file', async () => {
    const res = await SolidAdapter.create({name: "soyUnaPrueba", getIdentifier: () => "soy_un_id"}, routeShape, true, "child", "parent", "parentFilename")
    expect(res.added).toBe(false);
  });
});

describe.only('Remove file', () => {
  test('remove', async () => {
    const res = await SolidAdapter.remove('aaaa')
    expect(res).toBe(false);
  });
});