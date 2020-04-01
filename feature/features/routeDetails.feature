Feature: Ver detalles
 
Scenario: Quiero ver los detalles de una ruta
  Given Soy un usuario intentando ver los detalles de una ruta
  When abro la página de detalles
  Then veo los detalles