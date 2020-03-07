import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { AddMilestone } from './add-milestone.component';

describe('Add Route', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <AddMilestone />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});