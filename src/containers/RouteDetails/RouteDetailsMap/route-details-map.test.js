import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import {
  cleanup,
  render
} from 'react-testing-library';
import { RouteDetailsMapContainer } from './route-details-map.style';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { RouteDetailsMap } from './route-details-map.component';
import {Marker} from 'google-maps-react';

Enzyme.configure({ adapter: new Adapter() });

describe('Add Route', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <RouteDetailsMap />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('Route Map mount', () => {
    let wrapper = mount(<RouteDetailsMap />);
    let instance = wrapper.instance();

    instance.loadGeoJson();
    instance.render();
    instance.componentDidMount();
    instance.componentWillUnmount();
    expect(instance.state.isLoading).toBeTruthy();

    render(<RouteDetailsMapContainer>
              <Marker id="marcador"
                title={'Geolocation'}
                position={{
                lat:0,
                lng:0,
              }}
            fullscreenControl= {false}/>
          </RouteDetailsMapContainer>)

  })

});