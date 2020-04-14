import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import ListFriendsData from './list-friend-data.component';


describe('List Friends Data', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <ListFriendsData />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});