import { DistanceHelper } from "@utils";

describe.only('Distancet', () => {
  test('param corrects', async () => {
    expect(DistanceHelper.calculateDistance(1, 2, -3, -4)).toBe(801.6019780381059);
  });

  test('error', async () => {
    expect(DistanceHelper.calculateDistance(0, 2, 0, 2)).toBe(0);
  });
});