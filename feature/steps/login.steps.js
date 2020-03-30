import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./feature/features/login.feature');
const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

defineFeature(feature, test => {

  beforeEach(async () => {

    const browser = await puppeteer.launch({ headless: false, devTools: false });
    const page = await browser.newPage();
    await page.bringToFront();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3683.103 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9'
    });

    await page.goto('https://www.google.es');
  });

  test('Iniciando sesión', ({ given, when, then }) => {
    
    given('Soy un usuario intentando iniciar sesión', async () => {


    });

    when('relleno el formulario y lo envío', async () => {

        //document.getElementsByClassName('sc-gzVnrw isbeaB ids-links')[0].value = 'user';
        //document.getElementById('password').value = 'pass';
        //document.getElementById('submit').click()
        //document.getElementsByName("idp")[0].value = 'hola'
        //document.querySelectorAll('button')[0].click();

       // await page.focus('input');
        
        const element = page.waitForSelector('#realbox');
        
        //await page.evaluate(element => { element.setAttribute('value', 1234); }, element);

        await page.focus('#realbox');
        
        //await page.type('#fakebox-input', 'aaaaaa');

        //await page.type('123456');

        await delay(9000);
        
        page.waitForSelector('button').then(async () => await page.click('submit'))

        

    });

    then('nos redirige al la página de Solid', async () => {
      //const element = await page.$("h1");
      //const text = await page.evaluate(element => element.textContent, element);
      //expect(text).toMatch("Login");
    });
  });
});