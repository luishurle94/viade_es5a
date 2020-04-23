import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Chat from './chat.component';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route, Comment } from '@models';

Enzyme.configure({ adapter: new Adapter() });

let messages = [
  new Comment('prueba', 'soy:yo', new Date()),
  new Comment('prueba2', 'aaaaa', new Date()),
  new Comment()
]

const route = new Route();
route.webId = 'webId';
route.messagesObject = messages;

describe('Chat component', () => {
  afterAll(cleanup);

  it('Load Messages', () => {
    const instance = new Chat({route: route});
    instance.loadMessages();
    expect(instance.state.messages.length).toBeGreaterThanOrEqual(2);
  });

  it('New Message', () => {
    const instance = new Chat({route: route});
    instance.handleNewUserMessage('message');
    expect(instance.state.messages.length).toBeGreaterThanOrEqual(3);
  });

  // const { container } = render(<div><Chat route={route} t={() => {}} webId={'soy:yo'} id={route.webId}></Chat></div>);

  // it('should render without crashing', () => {
  //   expect(container).toBeTruthy();
  // });

  // it ('full screen change index', () => {
  // const wrapper = mount(<div><Chat route={route} t={() => {}} webId={'soy:yo'} id={route.webId}></Chat></div>);
  //   const instance = wrapper.instance();
  //   instance.handleNewUserMessage('message');
  //   expect(instance.state.messages.length).toBe(3)
  // })
});
