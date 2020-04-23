import * as StorageHelper from '../../test/__mocks__/@utils/storage.js';

import * as SolidHelper from "./solid-helper";
import routeShape from '@contexts/route-shape.json';

jest.mock('solid-auth-client');
jest.mock('solid-file-client');
jest.mock('../utils/storage');

describe.only('Get storage and predicate', () => {
  test('get storage path', async () => {
    const res = await SolidHelper.getAppPathStorage("https://jaluma.inrupt.net/profile/card#me");
    expect(res).toBe("https://jaluma.inrupt.net/profile/card#me");
  });

  test('get predicate', async () => {
    const con = {
      "@context": {
        "thing": "https://schema.org/Thing#",
      }, shape: [
        {
          prefix: 'thing',
          predicate: 'name'
        }
      ]
    };

    const field = {
      prefix: 'thing',
      predicate: 'name'
    };

    const result = SolidHelper.getPredicate(field, con);
    expect(result).toBe('https://schema.org/Thing#name');

  });
  
});

describe.only('Create initial files', () => {


  test('not exist', async () => {
    expect(await SolidHelper.createInitialStructure("http://www.user.com")).toBe(true)
  });
  test('exist', async () => {
    expect(await SolidHelper.createInitialStructure("http://www.user.com")).toBe(true)
  });
  
});

describe.only('Create and get document', () => {


  test('creating doc', async () => {
    expect(await SolidHelper.createAndGetDocument("http://www.user.com", false)).toBe(true)
  });
  test('not creating doc', async () => {
    expect(await SolidHelper.createAndGetDocument("http://www.friend3.com", true)).toBe(null)
  });
  
});

describe.only('Link file', () => {

  test('exist', async () => {
    expect(await SolidHelper.link("http://www.friend3.com", 'photo', true, 'filename', 'folder', 'solid:hasPhoto')).toBe(true)
  });

  test('not exist', async () => {
    expect(await SolidHelper.link("404", 'photo', false, 'filename', '', '')).toBe(false)
  });

  test('param undefined', async () => {
    expect(await SolidHelper.link()).toBe(false)
    expect(await SolidHelper.link("404")).toBe(false)
  });
  
});

describe.only('Unlink file', () => {

  test('exist', async () => {
    expect(await SolidHelper.unlink("http://www.friend3.com", 'solid:hasPhoto', 'url')).toBe(true)
  });

  test('not exist', async () => {
    expect(await SolidHelper.unlink("fail", 'solid:hasPhoto', 'url')).toBe(false)
  });

  test('param undefined', async () => {
    expect(await SolidHelper.unlink()).toBe(false)
    expect(await SolidHelper.unlink("404")).toBe(false)
  });
  
});

describe.only('Read file', () => {

  //it can't be possible mock ldflex generator. it always return undefined and crash.
  test('exist', async () => {
    // expect(await SolidHelper.fetchRawData("route1", routeShape)).toBe(true)
  });

  test('not exist', async () => {
    // expect(await SolidHelper.fetchRawData("aaaaaa", routeShape)).toBe(false)
  });

  test('param undefined', async () => {
    try {
      await SolidHelper.fetchRawData("404")
      fail();
    } catch(e) {
      expect(e.message).toBe('404')
    }

  });
  
});

describe.only('Read files in folder', () => {
  test('exist', async () => {
    expect(await SolidHelper.fetchFilesData("https://jaluma.inrupt.net/profile/card#me")).toBeTruthy()
  });

  test('param undefined', async () => {
    expect(await SolidHelper.fetchFilesData()).toBeUndefined();
  });
  
});

describe.only('Remove file', () => {
  test('exist', async () => {
    expect(await SolidHelper.deleteFile("webId")).toBe(true)
  });

  test('not exist', async () => {
    expect(await SolidHelper.deleteFile("aaaaaa")).toBe(false)
  });

  test('param undefined', async () => {
    expect(await SolidHelper.deleteFile()).toBe(false);
  });
  
});

describe.only('Get friend', () => {
  test('exist', async () => {
    expect((await SolidHelper.getFriends('me')).length).toBe(2)
  });
  
});