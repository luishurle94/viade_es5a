Feature: Añadir una ruta
 
Scenario: Añadiendo una ruta en la aplicación
  Given Soy un usuario en sesión que añade una ruta
  When  relleno el formulario
  Then nos añade la ruta
 