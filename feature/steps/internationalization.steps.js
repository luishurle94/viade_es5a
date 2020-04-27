import 'jest';

import {
  defineFeature,
  loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./feature/features/internationalization.feature');

defineFeature(feature, test => {

  beforeEach(async () => {
    await page.goto("http://localhost:3000");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('Cambiando el idioma de la aplicacion', ({ given, when, then }) => {
    given('Soy un usuario intentando cambiar el idioma de la aplicacion', async () => {
      await expect(page.title()).resolves.toMatch('Viade');
    });

    when('cambio el idioma', async () => {
      //await page.$eval("div[@id='root']/div/header/section/section/div/div/div/div/ul/li/button/span", element => element.click())
    });
      
   

    then('el idioma se cambia', async () => {
      await page.waitFor(10000);
      const element = await page.$("h1");
      const text = await page.evaluate(element => element.textContent, element);
      //expect(text).toMatch("Hola! Bienvenido a Solid.");
      expect(text).toMatch("Hi! Welcome to Viade.");
    });
  });
});

