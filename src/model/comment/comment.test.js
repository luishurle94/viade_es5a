import { Comment } from '@models';

const date = Date.now();
const comment = new Comment('CommentWebId', 'Comentario de prueba', 'Isabel', date);

describe.only('Create a new comment', () => {

  test('should create succesfully', async () => {
    expect(comment.webId === 'CommentWebId').toBe(true);
    expect(comment.message === 'Comentario de prueba').toBe(true);
    expect(comment.createdBy === 'Isabel').toBe(true);
    expect(comment.createdAt === date).toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Comment();
    expect(fail.webId).toBe(undefined);
    expect(fail.message).toBe(undefined);
    expect(fail.createdBy).toBe(undefined);
  });
});

describe.only('Get identifier', () => {
  test('should return true', async () => {
    expect(`Comentario de prueba_Isabel` === comment.getIdentifier()).toBe(true);
  });
});