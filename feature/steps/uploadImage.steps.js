import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./feature/features/uploadImage.feature');
const puppeteer = require('puppeteer')
let browser = null;
let page = null;

defineFeature(feature, test => {

  beforeEach(async () => {
    jest.setTimeout(1200000);
  });

  test('Subiendo una imagen en la aplicación', ({ given, when, then, and }) => {
    
    given('Soy un usuario en sesión que accede al formulario de añadir hito', async () => {
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

      await page.goto("http://localhost:3000/#/add-route", {
        waitUntil: 'networkidle2'
      });

      await page.waitForSelector("[id='nameId']", {visible: true});
      await page.type("[id='nameId']", "Ruta " + new Date());

      await page.waitFor(500);
      
      await page.waitForSelector("[id='descriptionId']", {visible: true});
      await page.type("[id='descriptionId']", "Estoy escribiendo esto con la mente....");

      await page.waitFor(500);
      
      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("[id='submitId']")];
        btns.forEach(function (btn) {
          if (btn.value == "Enviar"){
            btn.click();
          }
            
        });
      });

      await page.waitForNavigation({
        waitUntil: 'networkidle2'
      });


    });

    when('añado una imagen', async () => {

      await page.waitFor(500);
        
      await page.waitForSelector("[class='p-tabview-title']", {visible: true});
      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("[class='p-tabview-title']")];
        btns.forEach(function (btn) {
            btn.click();   
        });
      });


      const input = await page.$('.FileInput')
      await input.uploadFile('avatar2.jpg') //AQUI
      await input.evaluate(upload => upload.dispatchEvent(new Event('change', { bubbles: true })));

    });


    then('veo la imagen', async () => {
      await page.waitFor(500);
      await page.waitForSelector(".Row", {visible: true});
        
    });
    

  });

});