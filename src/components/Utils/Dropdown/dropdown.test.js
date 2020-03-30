import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Dropdown from './dropdown.component';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

afterAll(cleanup);

Enzyme.configure({ adapter: new Adapter() });

describe.only('Dropdown', () => {
  const { container, getByTestId } = render(<Dropdown className="dropDownContainer" />, {actions: ['hola']});

test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

test('renders styled components', () => {
    expect(document.querySelector('.dropDownContainer')).toBeTruthy();
    expect(getByTestId('dropdownMain')).toBeTruthy();
  });

  it('dropdown will respond to events correctly', () => {
    const tree = shallow(
      <Dropdown />
    );
    tree.simulate('click');
    expect(tree).toBeTruthy();
  });
});
