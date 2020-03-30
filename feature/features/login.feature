Feature: Logearse
 
Scenario: Iniciando sesión
  Given Soy un usuario intentando iniciar sesión
  When  relleno el formulario y lo envío
  Then nos redirige al la página de Solid
 