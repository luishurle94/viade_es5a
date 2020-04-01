import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { GalleriaComponent } from './gallery.component';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Gallery component', () => {
  afterAll(cleanup);

  let images = [
    {
      "previewImageSrc": 'https://media.metrolatam.com/2019/03/05/sonicthehedgehogwtfc-39364720302ba5b0982fddb757e05f8d.jpg',
      "thumbnailImageSrc": 'https://media.metrolatam.com/2019/03/05/sonicthehedgehogwtfc-39364720302ba5b0982fddb757e05f8d.jpg',
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": 'https://vignette.wikia.nocookie.net/animalcrossing/images/0/07/Logo_Animal_Crossing.png/revision/latest?cb=20151001110817&path-prefix=es',
      "thumbnailImageSrc": 'https://vignette.wikia.nocookie.net/animalcrossing/images/0/07/Logo_Animal_Crossing.png/revision/latest?cb=20151001110817&path-prefix=es',
      "alt": "Description for Image 1",
      "title": "Title 1"
    }
  ]

  const { container, rerender, getByTestId } = render(<GalleriaComponent images={images} activeIndex={1} isAutoPlayActive={false} isPreviewFullScreen={true} enableButtons={true}/>);

  it('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('should load only image list', () => {
    expect(render(<GalleriaComponent images={images} />)).toBeTruthy();
  });

  it ('stop gallery', () => {
    rerender(<GalleriaComponent images={images} isAutoPlayActive={true} enableButtons={true}/>);
    expect(getByTestId("play")).toBeTruthy()
    fireEvent.click(getByTestId("play"));
    fireEvent.click(getByTestId("play"));
    expect(getByTestId("play")).toBeTruthy()
  })

  it ('full screen', () => {
    rerender(<GalleriaComponent images={images}/>);
    expect(getByTestId("fullscreen")).toBeTruthy()
    fireEvent.click(getByTestId("fullscreen"));
    fireEvent.click(getByTestId("fullscreen"));
    expect(getByTestId("fullscreen")).toBeTruthy()
  })

  it ('full screen change index', () => {
    const wrapper = mount(<GalleriaComponent images={images} isAutoPlayActive={false}/>);
    const instance = wrapper.instance();
    instance.onItemChange({
      index: 0
    });
    expect(instance.state.activeIndex).toBe(0)
  })

  it ('full screen change', () => {
    const wrapper = mount(<GalleriaComponent images={images} isAutoPlayActive={false}/>);
    const instance = wrapper.instance();
    const state = instance.state;
    instance.onFullScreenChange();
    expect(instance.state.isPreviewFullScreen).toBe(!state.isPreviewFullScreen)
  })

  it('renders with footer', () => {
    expect(document.querySelector('.galleria')).toBeTruthy();
  });
});
