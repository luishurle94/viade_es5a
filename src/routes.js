import React, { Fragment } from 'react';

import {
  HashRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';

import {
  NotLoggedInLayout,
  PrivateLayout,
  PublicLayout,
} from '@layouts';

import {
  EditRoute,
  AddRoute,
  ListOwnRoutes,
  ListSharedRoutes,
  ListFriendsData,
  Login,
  PageNotFound,
  Profile,
  Register,
  RegistrationSuccess,
  Welcome,
} from './containers';
import {
  RouteDetails,
} from './containers/RouteDetails/route-details.component';

const privateRoutes = [
  {
    id: 'welcome',
    path: '/welcome',
    component: Welcome
  },
  {
    id: 'profile',
    path: '/profile',
    component: Profile
  },
  {
    id: 'add-route',
    path: '/add-route',
    component: AddRoute
  },
  {
    id: 'route-edit',
    path: '/route-edit',
    component: EditRoute
  },
  {
    id: 'route-details',
    path: '/route-details',
    component: RouteDetails
  },
  {
    id: 'list-routes',
    path: '/list-routes',
    component: ListOwnRoutes
  },
  {
    id: 'list-shared-routes',
    path: '/list-shared-routes',
    component: ListSharedRoutes
  },  {
    id: 'list-friends',
    path: '/list-friends',
    component: ListFriendsData
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
