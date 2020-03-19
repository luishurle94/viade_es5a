import * as Context from "./context";
import routeShape from '@contexts/route-shape.json';

describe.only('Generate suffix', () => {
  test('get suffix', async () => {
    expect(Context.expandedProperty('contenido', 'key:value')).toBe('contenido:value');
  });
});