import {
  defineFeature,
  loadFeature,
} from 'jest-cucumber';
import {
  browser,
  by,
  element,
} from 'react-embedded-browser';

const feature = loadFeature('src/features/internationalization.feature');

defineFeature(feature, test => {
    test('Cambiando el idioma de la aplicacion', ({ given, when, then }) => {
   
      given('Soy un usuario intentando cambiar el idioma de la aplicacion', () => {
        browser.get("http://localhost:3000/login");
      });
   
      when('cambio el idioma', () => {
        const botonEsp = element(by.className('flag-icon flag-icon-es'));
        botonEsp.click();
      });
   
      then('el idioma se cambia', () => {
        element(by.text("Hola! Bienvenido a Solid."));
      });
    });
  });