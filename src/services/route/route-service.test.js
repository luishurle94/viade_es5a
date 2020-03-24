import 'jest';

import * as SolidHelper from './../../../test/__mocks__/solid-helper';
import auth from './../../../test/__mocks__/solid-auth-client';

import { Route } from '@models'
import { RouteService } from '@services';

import { HashHelper } from '@utils';

jest.mock('../../solid/solid-helper');
jest.mock('solid-auth-client');

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const nameRoute = 'soy_una_ruta';

const route = new Route(makeid(20), nameRoute, 5, 10, 10, 'https://jaluma.inrupt.net/profile/card#me');
const rName = HashHelper.hash(route.getIdentifier());

describe.only('Add new route', () => {
  RouteService.default = jest.fn();

  test('should add sucessfully', async () => {
    const res = await RouteService.add(route);
    expect(res.added).toBe(true);
  });

  test('should return false because file has been created', async () => {
    const res = await RouteService.add(route);
    expect(res.added).toBe(false);
  });

});

describe.only('Remove route', () => {
  test('should remove sucessfully', async () => {
    expect(await RouteService.remove(1608503625)).toBe(true);
  });

  test('should return false', async () => {
    expect(await RouteService.remove('aaaa')).toBe(false)
  });

});

describe.only('Get route', () => {
  test('should get sucessfully', async () => {
    expect(await RouteService.get(HashHelper.hash('soy_una_ruta'))).toBeTruthy();
    expect(await RouteService.get(HashHelper.hash('soy_una_ruta'), true)).toBeTruthy();
  });

  test('should return undefined', async () => {
    expect(await RouteService.get('')).toBeTruthy(undefined);
  });

});

describe.only('Get all routes', () => {

  test('should get sucessfully', async () => {
    expect(await RouteService.getAll()).toBeTruthy();
    expect(await RouteService.getAll(false)).toBeTruthy();
  });

});