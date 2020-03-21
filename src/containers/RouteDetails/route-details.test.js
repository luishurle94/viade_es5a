import React from 'react';
import { render, cleanup, queryByAttribute } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteDetails } from './route-details.component';

describe('Add Route', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <RouteDetails />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});