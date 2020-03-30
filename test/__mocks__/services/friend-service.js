import 'jest';
import {Friend} from '@models'

export default jest.mock('./../../../src/services/friend/friend-service', () => {
  const getAll = jest.fn( async (getData = true) => {
    console.log('Hola')
    let friend1 = new Friend('Amigo 1');
    friend1.webId = 'Amigo1WebId';
    let friend2 = new Friend('Amigo 2');
    friend2.webId = 'Amigo2WebId';
    let friend3 = new Friend('Amigo 3');
    friend3.webId = 'Amigo3WebId';
    const friends = [friend1, friend2, friend3];
      return friends;
  })
console.log('Hola 12')
  return {getAll};
})