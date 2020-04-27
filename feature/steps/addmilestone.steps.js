import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./feature/features/addMilestone.feature');
const puppeteer = require('puppeteer')
let browser = null;
let page = null;

defineFeature(feature, test => {

  beforeEach(async () => {
    jest.setTimeout(1200000);

  });

  test('Añadiendo un hito a una ruta en la aplicación', ({ given, when, then }) => {
    
    given('Soy un usuario en sesión que crea una ruta y quiere añadirle un hito', async () => {
      browser = await puppeteer.launch({
        headless: false
      })
    
      page = await browser.newPage()
      await page.goto("http://localhost:3000/#/login", {
        waitUntil: 'networkidle2'
      });

      
      await page.waitForSelector(".sc-EHOje.cffgrt");
      await page.type(".sc-EHOje.cffgrt", "https://fakeadri.solid.community/profile/card#me");

      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Iniciar sesión"){
            btn.click();
          }
            
        });
      });

      await page.waitForNavigation({
        waitUntil: 'networkidle2'
      });

      await page.waitForSelector("[id='username']", {visible: true});
      await page.type("[id='username']", "fakeAdri");

      await page.waitFor(500);
      await page.waitForSelector("[id='password']", {visible: true});
      await page.type("[id='password']", "9FakeAdri9*", {visible: true});

      await page.waitFor(500);

      await page.evaluate(() => {
        let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Log In")
            btn.click();
        });
      });

      await page.waitForNavigation({
        waitUntil: 'networkidle2'
      });

      expect(page.url()).toBe("http://localhost:3000/#/welcome")

      await page.goto("http://localhost:3000/#/route-edit?routeId=https://fakeadri.solid.community/public/viade/1727944335.ttl", {
        waitUntil: 'networkidle2'
      });

    });

    when('relleno el formulario', async () => {

      await page.waitForSelector("[id='nameId']", {visible: true});
      await page.type("[id='nameId']", " lo hizo fakeAdri el día " + new Date());

      await page.waitFor(500);
      
      await page.waitForSelector("[id='descriptionId']", {visible: true});
      await page.type("[id='descriptionId']", "Repito que es un hito muy bonito....");

      await page.waitFor(500);
      
      await page.waitForSelector("[id='latitudeId']", {visible: true});
      await page.type("[id='latitudeId']", "10");

      await page.waitFor(500);
      
      await page.waitForSelector("[id='longitudeId']", {visible: true});
      await page.type("[id='longitudeId']", "20");

      await page.waitFor(500);
      
      await page.waitForSelector("[id='altitudeId']", {visible: true});
      await page.type("[id='altitudeId']", "30");

      
      await page.waitFor(500);
      
      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("[id='submitId']")];
        btns.forEach(function (btn) {
          if (btn.value == "Enviar"){
            btn.click();
          }
            
        });
      });

    });

    then('contacta con el POD para añadirnos el hito', async () => {

      await page.waitForSelector(".sc-kvZOFW.loleYq", {visible: true, timeout: 120000});
 
    });

  });

});