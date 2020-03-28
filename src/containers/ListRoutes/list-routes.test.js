import React from 'react';
import { render/*, cleanup, queryByAttribute, fireEvent*/ } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import ListRoutes from './list-routes.component';

describe('List routes', () => {

  const { container } = render(
    <Router>
      <ListRoutes />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});