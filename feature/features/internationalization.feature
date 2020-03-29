Feature: Cambiar idioma
 
Scenario: Cambiando el idioma de la aplicacion
  Given Soy un usuario intentando cambiar el idioma de la aplicacion
  When cambio el idioma
  Then el idioma se cambia
 