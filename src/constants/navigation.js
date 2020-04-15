/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'add-route',
    icon: 'img/icon/route-add.svg',
    label: 'navBar.add-route',
    to: '/add-route'
  },
  {
    id: 'list-routes',
    icon: 'img/icon/route-list.svg',
    label: 'navBar.list-routes',
    to: '/list-routes'
  },
  {
    id: 'list-shared-routes',
    icon: 'img/list-shared.png',
    label: 'navBar.list-shared-routes',
    to: '/list-shared-routes'
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
