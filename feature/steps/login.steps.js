import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./feature/features/login.feature');
const INPUT_SELECTOR = "section input";
const ENTER_EVENT = "Enter";

defineFeature(feature, test => {

  beforeEach(async () => {
    await page.goto("http://localhost:3000/#/login");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('Iniciando sesión', ({ given, when, then }) => {
    
    given('Soy un usuario intentando iniciar sesión', async () => {
      await expect(page.title()).resolves.toMatch('Solid App');
      const element = await page.$("h1");
      const text = await page.evaluate(element => element.textContent, element);
      expect(text).toMatch("Hi! Welcome to Solid.");
    });

    when('relleno el formulario y lo envío', async () => {

      await page.waitForSelector(INPUT_SELECTOR);
      const input = await page.$(INPUT_SELECTOR);
      input.press(ENTER_EVENT, "https://UO264046.solid.community/profile/card#me");
      await page.$eval('button', el => { console.log(el); el.click();});
      
    });

    then('nos redirige al la página de Solid', async () => {
      const element = await page.$("h1");
      const text = await page.evaluate(element => element.textContent, element);
      //expect(text).toMatch("Login");
    });
  });
});