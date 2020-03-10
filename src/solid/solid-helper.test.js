import * as SolidHelper from "./solid-helper";

describe.only('Solid adapter', () => {
  test('get storage path', async () => {
    SolidHelper.getAppPathStorage("https://jaluma.inrupt.net/profile/card#me").then(res => {
      expect(res).toBe("https://jaluma.inrupt.net");
    });

  });

  test('get predicate', async () => {
    const con = {
      "@context": {
        "thing": "https://schema.org/Thing#",
      }, shape: [
        {
          prefix: 'thing',
          predicate: 'name'
        }
      ]
    };

    const field = {
      prefix: 'thing',
      predicate: 'name'
    };

    const result = SolidHelper.getPredicate(field, con);
    expect(result).toBe('https://schema.org/Thing#name');

  });
  
});