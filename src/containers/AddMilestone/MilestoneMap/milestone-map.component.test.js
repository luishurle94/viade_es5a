import React from 'react';
import { render, cleanup} from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { MilestoneMap } from './milestone-map.component';

describe('Add Milestone', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <MilestoneMap />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });


});