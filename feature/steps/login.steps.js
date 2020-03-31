import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./feature/features/login.feature');
const puppeteer = require('puppeteer')
const screenshot = 'amazon_nyan_cat_pullover.png'

defineFeature(feature, test => {

  beforeEach(async () => {
});

  test('Iniciando sesión', ({ given, when, then }) => {
    
    given('Soy un usuario intentando iniciar sesión', async () => {


    });

    when('relleno el formulario y lo envío', async () => {

      (async () => {
        const browser = await puppeteer.launch({
          headless: false
        })
        const page = await browser.newPage()
        await page.goto("https://www.instagram.com/accounts/login/?source=auth_switcher", {
          waitUntil: 'networkidle2'
        });
      
        //email
        await page.waitForSelector("[name='username']");
        // await page.click("[name='username']");
        await page.type("[name='username']", "Adri");
      
        //password
        await page.keyboard.down("Tab");
        //uncomment the following if you want the passwor dto be visible
        // page.$eval("._2hvTZ.pexuQ.zyHYP[type='password']", (el) => el.setAttribute("type", "text"));
        await page.keyboard.type("Contrasennna");
      
        //the selector of the "Login" button
        // await page.click("._0mzm-.sqdOP.L3NKy>.Igw0E.IwRSH.eGOV_._4EzTm");
        
        //we find the Login btn using the innerText comparison because the selector used for the btn might be unstable
        await page.evaluate(() => {
          let btns = [...document.querySelector(".HmktE").querySelectorAll("button")];
          btns.forEach(function (btn) {
            if (btn.innerText == "Iniciar sesión")
              btn.click();
          });
        });
      
        //Optional
        //check if the element asking to download the app arises
        // try {
        // 	await loginPage.waitForSelector("._3m3RQ._7XMpj",{
        // 		timeout:3000
        // 	});
        // 	await loginPage.click("._3m3RQ._7XMpj");
        // } catch (err) {
      
        // }
      
        //Optional
        //check if the app asks for notifications
        // try {
        // 	await loginPage.waitForSelector(".aOOlW.HoLwm",{
        // 		timeout:5000
        // 	});
        // 	await loginPage.click(".aOOlW.HoLwm");
        // } catch (err) {
      
        // }
      
        await page.waitForSelector(".glyphsSpriteMobile_nav_type_logo");
      
        await page.screenshot({ path: screenshot });
      
        browser.close()
        console.log('See screenshot: ' + screenshot)
      })()

    });

    then('nos redirige al la página de Solid', async () => {
      //const element = await page.$("h1");
      //const text = await page.evaluate(element => element.textContent, element);
      //expect(text).toMatch("Login");
    });
  });
});