import 'jest';
import {Route} from '@models'

export default jest.mock('./../../../src/services/route/route-service', () => {
  const getAll = jest.fn( async (getData = true) => {
    const routes = [
      new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
      new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
      new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
      new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
    ];
    
    return routes;
  })

  return {getAll};
})