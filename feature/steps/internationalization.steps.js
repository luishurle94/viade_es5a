import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

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
      await expect(page.title()).resolves.toMatch('Solid App');
    });

    when('cambio el idioma', async () => {
      // await page.$eval('.sc-TOsTZ > .flag-icon', el => el.parentNode.click());
    });

    then('el idioma se cambia', async () => {
      const element = await page.$("h1");
      const text = await page.evaluate(element => element.textContent, element);
      expect(text).toMatch("Hi! Welcome to Solid.");
    });
  });
});