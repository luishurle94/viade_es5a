import 'jest';
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListFriendsData } from './list-friend-data.component';
import {Friend} from '@models'

import { FriendService } from '@services';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


jest.spyOn(FriendService, 'getAll').mockImplementationOnce(() => {
  return Promise.resolve([
    new Friend('https://uo264046.solid.community/profile/card#me', 'Adri', undefined),
    new Friend('https://adrian99.solid.community/profile/card#me', 'Adri99', undefined)
  ])
})

describe('List friends', () => {
  afterAll(cleanup);

  const { container} = render(
    <Router>
      <ListFriendsData />
    </Router>
  );

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  })

});