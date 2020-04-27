import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup, fireEvent, getByTestId, act, queryByAttribute } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListFriendsData } from './list-friend-data.component';
import {Friend} from '@models'

import { FriendService } from '@services';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


jest.spyOn(FriendService, 'getAll').mockImplementationOnce(() => {
  return Promise.resolve([
    new Friend('https://uo264046.solid.community/profile/card#me', 'Adri', undefined),
    new Friend('https://adrian99.solid.community/profile/card#me', 'Adri99', undefined)
  ])
})

const getById = queryByAttribute.bind(null, 'id');

describe('List friends data', () => {
  afterAll(cleanup);

  const { container} = render(
    <Router>
      <ListFriendsData />
    </Router>
  );

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  it("Button to open dialog test", () => {

    const { container, rerender } = render(    <Router>
      <ListFriendsData />
    </Router>);
    const button = getByTestId(container, "send");
    
    act(() => {
      fireEvent.click(button);

      rerender(    <Router>
        <ListFriendsData />
      </Router>);
    });
  });

  it("Adding friend on dialog test", () => {

    const { container, rerender } = render(    <Router>
      <ListFriendsData />
    </Router>);
    const button = getByTestId(container, "send");
    
    act(() => {
      fireEvent.click(button);

      rerender(    <Router>
        <ListFriendsData />
      </Router>);
    });
    
    //nameId

    act(() => {

      const input = getById(container, 'nameId');
      const query = 'https://adri99inrupt.inrupt.net/profile/card#me';
      const mockChange = jest.fn();
      expect(input.value).toEqual('');
      input.onChange = mockChange;
  
      fireEvent.change(input, { target: { value: query } });
      expect(input.value).toEqual('https://adri99inrupt.inrupt.net/profile/card#me');

      const dialogbutton = getByTestId(container, "sendDialog");
      fireEvent.click(dialogbutton);
      rerender(    <Router>
        <ListFriendsData />
      </Router>);
    });
  });
});