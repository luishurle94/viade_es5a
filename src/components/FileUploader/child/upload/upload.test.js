import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { Upload } from './upload.component';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Dropzone', () => {
  afterAll(cleanup);
  const { container, queryByTestId, getByTestId } = render(<Upload webId='' routeId='' t={() => {}}/>);

  it('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('should render buttons', () => {
    expect(getByTestId("clear")).toBeTruthy()
    expect(getByTestId("upload")).toBeTruthy()
  });

  const files = {
    length: 1,
    item: (i) => new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    })
  }

  it('upload files', () => {
    expect(getByTestId("fileinput")).toBeTruthy()
    fireEvent.change(getByTestId("fileinput"), {
      target: {
        files: files
      }
    });
    expect(queryByTestId("file")).toBeNull();

    fireEvent.click(getByTestId("upload"));
    expect(getByTestId("fileinput")).toBeTruthy()

    const wrapper = shallow(<Upload webId='ppp' routeId='asd' t={() => {}}/>);
    const instance = wrapper.instance();
    instance.onFilesAdded(files.item(0));
  });
}); 