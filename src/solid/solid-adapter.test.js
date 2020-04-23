import 'jest';

import * as SolidHelper from './../../test/__mocks__/solid-helper';
import auth from './../../test/__mocks__/solid-auth-client';

import { HashHelper } from '@utils'
import routeShape from '@contexts/route-shape.json';
import * as SolidAdapter from "./solid-adapter";

jest.mock('./solid-helper');
jest.mock('solid-auth-client');

describe.only('Create file', () => {
  test('create new file', async () => {
    const res = await SolidAdapter.create({ name: "soyUnaPrueba", getIdentifier: () => "soy_un_id" }, routeShape, true, "child", "parent", "parentFilename")
    expect(res.added).toBe(true);
  });

  test('create duplicate file', async () => {
    const res = await SolidAdapter.create({ name: "soyUnaPrueba", getIdentifier: () => "soy_un_id" }, routeShape, true, "child", "parent", "parentFilename")
    expect(res.added).toBe(false);
  });
});

describe.only('Link/Unlink', () => {
  test('link', async () => {
    await SolidAdapter.link(HashHelper.hash("soy_un_id"), 'url', false, 'schema:description');
    await SolidAdapter.link()
  });

  test('unlink', async () => {
    await SolidAdapter.unlink(HashHelper.hash("soy_un_id"), 'schema:name', 'url');
    await SolidAdapter.unlink()
  });
});

describe.only('Get data', () => {
  test('correct', async () => {
    await SolidAdapter.create({ name: "soyUnaPrueba", getIdentifier: () => "soy_un_id" }, routeShape, true, "child", "parent", "parentFilename")
    expect((await SolidAdapter.get('https://jaluma.inrupt.net/1324541791.ttl', routeShape)).name).toBe('soyUnaPrueba');
  });

  test('undefined params', async () => {
    expect(await SolidAdapter.get()).toBe(undefined)
    expect(await SolidAdapter.get('aaaa')).toBe(undefined)
  });
});

describe.only('Get all files', () => {
  test('list one', async () => {
    expect((await SolidAdapter.getAll()).length).toStrictEqual(1);
    expect((await SolidAdapter.getAll('aaa')).length).toStrictEqual(0);
    expect((await SolidAdapter.getAll('1324541791')).length).toStrictEqual(0);
  });
});

describe.only('Get current user', () => {
  test('succesfully', async () => {
    expect(await SolidAdapter.currentUserId()).toBe('https://jaluma.inrupt.net/');
  });
});

describe.only('Get friends', () => {
  test('succesfully', async () => {
    expect((await SolidAdapter.getFriends('url')).length).toBe(2);
  });
});

describe.only('Create predicate  ', () => {
  test('succesfully', async () => {
    expect(await SolidAdapter.getPredicate({ prefix: 'schema', 'predicate': 'name' }, routeShape)).toBe('schema:name');
  });
});

describe.only('Check params', () => {
  test('first time', async () => {
    expect(await SolidAdapter.checkParams()).toStrictEqual({"createDocument": true, "folder": "", "parentFilename": "settings.ttl", "parentPredicate": "schema:hasPart", "parentWebId": 'https://jaluma.inrupt.net/', "webId": 'https://jaluma.inrupt.net/'});
    expect(await SolidAdapter.checkParams(false, 'folder', 'parent', 'predicate', 'webId', 'web')).toStrictEqual({"createDocument": true, "folder": "web/", "parentFilename": "1348032073.ttl", "parentPredicate": "webId", "parentWebId": 'parent', "webId": 'folder'});
  });
});

describe.only('Remove file', () => {
  test('remove succesfully', async () => {
    await SolidAdapter.create({ name: "soyUnaPrueba", getIdentifier: () => "soy_un_id" }, routeShape, true, "child", "parent", "parentFilename")
    const remove = await SolidAdapter.remove(HashHelper.hash("soy_un_id"));
    expect(remove).toBe(true);
  });

  test('not remove', async () => {
    const res = await SolidAdapter.remove('aaaa')
    expect(res).toBe(false);
  });
});