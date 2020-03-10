/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id:'map',
    icon : '/img/googlemaps.svg',
    label :'Mapa de rutas',
    to :'/routemap'
  },
  {
    id: 'add-route',
    icon: '/img/icon/route.png',
    label: 'navBar.add-route',
    to: '/add-route'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
