import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { Dropzone } from './dropzone.component';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Dropzone', () => {
  afterAll(cleanup);
  const { container, rerender, getByTestId } = render(<Dropzone disabled={false} onFilesAdded={() => {}}/>);

  it('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('not should move mouse (disabled)', () => {
    rerender(<Dropzone disabled={true} onFilesAdded={() => {}}/>);
    fireEvent.click(getByTestId("dropzone"));
    expect(getByTestId("fileinput")).toBeTruthy()
    fireEvent(getByTestId("dropzone"), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
    fireEvent(getByTestId("dropzone"), new MouseEvent('dragover', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
    fireEvent(getByTestId("dropzone"), new MouseEvent('dragleave', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
    expect(getByTestId("fileinput")).toBeTruthy()
  });

  it('not should move mouse (enabled)', () => {
    rerender(<Dropzone disabled={false} onFilesAdded={() => {}}/>);
    fireEvent.click(getByTestId("dropzone"));
    expect(getByTestId("fileinput")).toBeTruthy()
    fireEvent(getByTestId("dropzone"), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
    fireEvent(getByTestId("dropzone"), new MouseEvent('dragover', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
    fireEvent(getByTestId("dropzone"), new MouseEvent('dragleave', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
    expect(getByTestId("fileinput")).toBeTruthy()
  });

  const files = {
    length: 1,
    item: (i) => new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    })
  }

  it('upload file (disabled)', () => {
    rerender(<Dropzone disabled={true} onFilesAdded={() => {}}/>);
    
    fireEvent.change(getByTestId("fileinput"), {
      target: {
        files: files
      }
    });
    expect(getByTestId("fileinput")).toBeTruthy()
  });


  it('upload file (enabled)', () => {
    rerender(<Dropzone disabled={false} onFilesAdded={() => {}}/>);
    
    fireEvent.change(getByTestId("fileinput"), {
      target: {
        files: files
      }
    });
    expect(getByTestId("fileinput")).toBeTruthy()
  });

  it('drop file (disabled)', () => {
    const wrapper = shallow(<Dropzone disabled={true} onFilesAdded={() => {}}/>);
    const instance = wrapper.instance();
    instance.onDrop({
      dataTransfer: {
        files: files
      },
      preventDefault: () => {}
    });
  });

  it('drop file (enabled)', () => {
    const wrapper = shallow(<Dropzone disabled={false} onFilesAdded={() => {}}/>);
    const instance = wrapper.instance();
    instance.onDrop({
      dataTransfer: {
        files: files
      },
      preventDefault: () => {}
    });
  });

  it('drop file (fail)', () => {
    const wrapper = shallow(<Dropzone />);
    const instance = wrapper.instance();
    instance.onDrop({
      dataTransfer: {
        files: files
      },
      preventDefault: () => {}
    });
  });

  it('should click button(disabled)', () => {
    rerender(<Dropzone disabled={true} onFilesAdded={() => {}}/>);
    fireEvent.click(getByTestId("dropzone"));
    expect(getByTestId("fileinput")).toBeTruthy()
  });

  it('should click button(enabled)', () => {
    rerender(<Dropzone disabled={false} onFilesAdded={() => {}}/>);
    fireEvent.click(getByTestId("dropzone"));
    expect(getByTestId("fileinput")).toBeTruthy()
  });

  it('should render FileUploader', () => {
    rerender(<Dropzone disabled={false} onFilesAdded={() => {}}/>);

    expect(document.querySelector('.FileInput')).toBeTruthy();
  });
});