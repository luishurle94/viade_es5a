import 'jest';
import * as FriendService from './../../../test/__mocks__/services/friend-service';
import React from 'react';
import { render, cleanup, fireEvent, screen } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListFriends } from './list-friends.component';



jest.mock('../../services/friend/friend-service')

describe('List friends', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <ListFriends />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('list friends', () => {
    expect(screen.getByText('Amigo1WebId')).toExist();
    expect(screen.getByText('Amigo2WebId')).toExist();
    expect(screen.getByText('Amigo3WebId')).toExist();
  });
});