import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from 'react-testing-library';
import GoogleMap from './map.component';

describe('Google Map', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <GoogleMap/>
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
