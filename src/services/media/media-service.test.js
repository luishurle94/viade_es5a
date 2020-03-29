import 'jest';

import * as SolidHelper from '../../../test/__mocks__/solid-helper';
import auth from '../../../test/__mocks__/solid-auth-client';

import { Media } from '@models'
import { MediaService } from '@services';
import { HashHelper } from '@utils'

jest.mock('../../solid/solid-helper');
jest.mock('solid-auth-client');

const rName = HashHelper.hash('soy_una_ruta');

const media = new Media('http://example.com/image', 'aaaaaaa', new Date(), 'me', 'image/jpg');

describe.only('Add image', () => {
  MediaService.default = jest.fn();
  test('should add sucessfully', async () => {
    expect(await MediaService.addMedia(rName, media)).toBe(true);
  });

  test('should return false because params are incorrect', async () => {
    media.body = '404';
    expect(await MediaService.addMedia(rName, media)).toBe(false);
    expect(await MediaService.addMedia(HashHelper.hash('soy_una_imagen'), media)).toBe(false);
    expect(await MediaService.addMedia('404', media)).toBe(false);
    expect(await MediaService.addMedia(rName)).toBe(false);
    expect(await MediaService.addMedia()).toBe(false);
  });

});

describe.only('Get image', () => {
  test('should get sucessfully', async () => {
    expect(await MediaService.get(HashHelper.hash('soy_una_imagen'))).toBeTruthy();
    expect(await MediaService.get(HashHelper.hash('soy_una_imagen'), true)).toBeTruthy();
  });

  test('should return undefined', async () => {
    expect(await MediaService.get('')).toBeTruthy(undefined);
  });

});

describe.only('Get href', () => {
  test('should add sucessfully', async () => {
    const webId = 'https://jaluma.inrupt.net/profile/card#me';
    const filename = 'prueba';
    const url = MediaService.getHref(webId, filename);
    expect(url.includes('jaluma.inrupt.net')).toBe(true);
    expect(url.includes('media/prueba')).toBe(true);
  });

});