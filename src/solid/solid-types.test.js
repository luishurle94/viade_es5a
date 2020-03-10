import { SolidTypesHelper } from '../solid';

describe.only('Transformations', () => {
  test('transform number', async () => {
      const number = 5;
      expect(SolidTypesHelper.transformTypes("number", number.toString())).toBe(number);
      expect(SolidTypesHelper.transformTypes("NUMBER", number.toString())).toBe(number);
  });

  test('transform date', async () => {
      const date = new Date();
      expect(SolidTypesHelper.transformTypes("Date", date.getTime().toString())).toBe(date.getTime());
      expect(SolidTypesHelper.transformTypes("date", date.getTime().toString())).toBe(date.getTime());
  });

  test('transform another type', async () => {
    expect(SolidTypesHelper.transformTypes("String", "test")).toBe("test");
    expect(SolidTypesHelper.transformTypes("aaa", "test")).toBe("test");
    expect(SolidTypesHelper.transformTypes("aaa", "test")).toBe("test");
  });

});