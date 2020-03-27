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
const mName = HashHelper.hash(media.getIdentifier());

describe.only('Add image', () => {
  MediaService.default = jest.fn();
  test('should add sucessfully', async () => {
    expect(await MediaService.addMedia(rName, media)).toBe(true);
  });

  test('should return false because param are incorrect', async () => {
    media.body = '404';
    expect(await MediaService.addMedia('aaaa', media)).toBe(false);
    expect(await MediaService.addMedia('404', media)).toBe(false);
    expect(await MediaService.addMedia(rName)).toBe(false);
    expect(await MediaService.addMedia()).toBe(false);
  });

});