Feature: Subir una imagen
 
Scenario: Subiendo una imagen en la aplicación
  Given Soy un usuario en sesión que accede al formulario de añadir hito
  When  añado una imagen
  Then veo la imagen
 