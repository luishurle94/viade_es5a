import React from 'react'

import { render, cleanup, fireEvent } from 'react-testing-library';
import { ListFriends } from './list-friends.component';
import { FriendService } from '@services';
import { Friend } from '@models'

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe('List friends', () => {
  afterAll(cleanup);

  jest.spyOn(FriendService, 'getAll').mockImplementationOnce(() => {
    let friend1 = new Friend('Amigo 1', 'image');
    friend1.webId = 'Amigo1WebId';
    let friend2 = new Friend('Amigo 2', 'image');
    friend2.webId = 'Amigo2WebId';
    let friend3 = new Friend('Amigo 3', 'image');
    friend3.webId = 'Amigo3WebId';
    return Promise.resolve([friend1, friend2, friend3])
  })

  const { container, queryByText } = render(<ListFriends />);

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('list friends', () => {
    expect(queryByText('Amigo1WebId')).toBeTruthy();
    expect(queryByText('Amigo2WebId')).toBeTruthy();
    expect(queryByText('Amigo3WebId')).toBeTruthy();
  });

  test('selected friends', () => {
    let wrapper = shallow(<ListFriends />);
    let instance = wrapper.instance();
    instance.componentDidMount = () => {
      return [new Friend().webId = 'Amigo1WebId']
    };
    instance.setState({
      selected: 'AmigoWebId'
    })
    expect(instance.state.selected).toBeTruthy();
  })

});