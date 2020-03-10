import { HashHelper } from "../utils";

describe.only('Generate Hash', () => {
  test('it should get same value', async () => {
    expect(HashHelper.hash('Prueba120')).toBe(1993149598);
  });
});