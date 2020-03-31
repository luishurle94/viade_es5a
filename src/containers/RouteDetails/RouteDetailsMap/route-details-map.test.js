import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import {
  cleanup,
  queryByAttribute,
  render,
} from 'react-testing-library';

import { RouteDetailsMap } from './route-details-map.component';

describe('Add Route', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <RouteDetailsMap />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});