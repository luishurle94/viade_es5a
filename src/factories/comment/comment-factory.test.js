import { CommentFactory } from '@factories';

describe.only('Transformations', () => {
  test('transform object', async () => {

    const comment = {
      webId: "https://jaluma.inrupt.net/public/viade/1993149598/1993149598.ttl",
      message: "Prueba120",
      createdAt: "Esto es una prueba",
      createdBy: "https://jaluma.inrupt.net/"
    };

    const result = CommentFactory.create(comment);

    expect(comment.webId === result.webId).toBe(true);
    expect(comment.message === result.message).toBe(true);
    expect(comment.createdAt === result.createdAt).toBe(true);
    expect(comment.createdBy === result.createdBy).toBe(true);
  });

  test('transform object', async () => {

    const comment = {
    };

    const result = CommentFactory.create(comment);

    expect(result).toBeTruthy();
  });

  test('transform undefined', async () => {
    const result = CommentFactory.create();

    expect(result).toBeUndefined()
  });

  test('transform null', async () => {
    const comment = null;
    const result = CommentFactory.create(comment);

    expect(result).toBeUndefined()
  });
});