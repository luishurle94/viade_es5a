import 'jest';

import * as SolidHelper from '../../../test/__mocks__/solid-helper';
import auth from '../../../test/__mocks__/solid-auth-client';

import { Comment } from '@models'
import { CommentService } from '@services';
import { HashHelper } from '@utils'

jest.mock('../../solid/solid-helper');
jest.mock('solid-auth-client');

const rName = HashHelper.hash('soy_un_ruta');

const comment = new Comment('aaaaaaa', new Date(), 'me');

describe.only('Add comment', () => {
  CommentService.default = jest.fn();
  test('should add sucessfully', async () => {
    expect((await CommentService.publishComment(rName, comment)).added).toBe(true);
  });

  test('should return false because params are incorrect', async () => {
    expect((await CommentService.publishComment(rName)).added).toBe(false);
    expect((await CommentService.publishComment()).added).toBe(false);
  });

});

describe.only('Get comment', () => {
  test('should get sucessfully', async () => {
    expect(await CommentService.get(HashHelper.hash('soy_un_comentario'))).toBeTruthy();
    expect(await CommentService.get(HashHelper.hash('soy_un_comentario'), true)).toBeTruthy();
  });

  test('should return undefined', async () => {
    expect(await CommentService.get('')).toBeTruthy(undefined);
  });

});