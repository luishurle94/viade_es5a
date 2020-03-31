Feature: Añadir un hito
 
Scenario: Añadiendo un hito a una ruta en la aplicación
  Given Soy un usuario en sesión que crea una ruta y quiere añadirle un hito
  When  relleno el formulario
  Then contacta con el POD para añadirnos el hito
 