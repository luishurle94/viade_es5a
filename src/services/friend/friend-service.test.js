import 'jest';

import * as SolidHelper from './../../../test/__mocks__/solid-helper';
import auth from './../../../test/__mocks__/solid-auth-client';

import { Friend } from '@models';
import { FriendService } from '@services';

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

const nameFriend = 'soy_un_amigo';

const friend = new Friend(nameFriend);
// const fName = HashHelper.hash(friend.getIdentifier());

describe.only('Get friend', () => {

  test('should get successfully', async () => {
    expect(await FriendService.get(HashHelper.hash('soy_un_amigo'))).toBeTruthy(); 
  })

  test('should return undefined', async () => {
    expect(await FriendService.get('')).toBeTruthy(undefined);
  });
});

describe.only('Get all friends', () => {
  test('should get successfully', async () => {
    expect(await FriendService.getAll()).toBeTruthy();
    expect(await FriendService.getAll(false)).toBeTruthy();
  });
});