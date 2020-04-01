/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'add-route',
    icon: 'img/icon/route.png',
    label: 'navBar.add-route',
    to: '/add-route'
  },
  {
    id: 'list-routes',
    icon: 'img/bars-nav.svg',
    label: 'navBar.list-routes',
    to: '/list-routes'
  },
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
