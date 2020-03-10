import { Route } from '../../model'
import { RouteService } from '..';

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe.only('Add new route', () => {
  const route = new Route(makeid(20), 'Esto es una prueba', 5, 10, 10, 'https://jaluma.inrupt.net/profile/card#me');

  test('should add sucessfully', async () => {
      RouteService.add(route).then(res => {
        expect(res).toBeTruthy();
      });
  });

  test('should return false because file has been created', () => {
    RouteService.add(route).then(res => {
      expect(res).toBeTruthy();
    });
  });
});