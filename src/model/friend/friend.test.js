import { Friend } from '@models';

const img = new Image();
const friend = new Friend('Isabel', img);
friend.webId = 'webId'

describe.only('Create a new friend', () => {

  test('should create succesfully', async () => {
    expect(friend.webId === 'webId').toBe(true);
    expect(friend.name === 'Isabel').toBe(true);
    expect(friend.image === img).toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Friend();
    expect(fail.name).toBe(undefined);
    expect(fail.image).toBe(undefined);
  });
});

describe.only('Get identifier', () => {
  test('should return true', async () => {
    expect(`Isabel_webId` === friend.getIdentifier()).toBe(true);
  });
});