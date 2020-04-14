Feature: Ver mis amigos
 
Scenario: Listando mis amigos
  Given Soy un usuario en sesión
  When  voy a la lista de amigos
  Then veo a mis amigos
 