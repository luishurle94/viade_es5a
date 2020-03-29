import 'jest';

import * as SolidHelper from './../../../test/__mocks__/solid-helper';
import auth from './../../../test/__mocks__/solid-auth-client';

import { Milestone } from '@models'
import { MilestoneService } from '@services';
import { Route } from '@models';
import { HashHelper } from '@utils'

jest.mock('../../solid/solid-helper');
jest.mock('solid-auth-client');

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const nameRoute = 'soy_una_ruta';
const rName = HashHelper.hash(nameRoute);

const milestone = new Milestone(makeid(20), 'Esto es una prueba', 'Descripcion', 5, 10, 10, 11);
const mName = HashHelper.hash(milestone.getIdentifier());

describe.only('Add new milestone', () => {
  MilestoneService.default = jest.fn();

  test('should add sucessfully', async () => {
    const res = await MilestoneService.add(rName, milestone);
    expect(res.added).toBe(true);
  });

  test('should return false because file has been created', async () => {
    const res = await MilestoneService.add(rName, milestone);
    expect(res.added).toBe(false);
  });

});

describe.only('Remove milestone', () => {
  test('should remove sucessfully', async () => {
    expect(await MilestoneService.remove(1608503625, 1574320256)).toBe(true);
  });

  test('should return false', async () => {
    expect(await MilestoneService.remove(1608503625, 'bbbb')).toBe(false);
    expect(await MilestoneService.remove('aaaa', 'bbbbb')).toBe(false)
    expect(await MilestoneService.remove('aaaa')).toBe(false)
  });

});

describe.only('Link milestone', () => {
  test('should link sucessfully', async () => {
    await MilestoneService.link(name, mName);
  });
});

describe.only('Get milestone', () => {
  test('should get sucessfully', async () => {
    expect(await MilestoneService.get(HashHelper.hash('soy_un_hito'))).toBeTruthy();
  });

  test('should return undefined', async () => {
    expect(await MilestoneService.get('')).toBeTruthy(undefined);
  });

});

describe.only('Get all milestones', () => {

  test('should get sucessfully', async () => {
    expect(await MilestoneService.getAll()).toBeTruthy();
    expect(await MilestoneService.getAll(false)).toBeTruthy();
  });

});