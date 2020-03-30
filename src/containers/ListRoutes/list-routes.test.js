import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListRoutes } from './list-routes.component';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  RouteDetails
} from './list-routes.style';
import {Route} from '@models'

import { RouteService } from '@services';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


jest.spyOn(RouteService, 'getAll').mockImplementationOnce(() => {
  return Promise.resolve([
    new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
    new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
    new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
    new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
  ])
})

describe('List routes', () => {
  afterAll(cleanup);

  const routes = [
    new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
    new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
    new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
    new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
  ];

  const { t } = useTranslation();  

  const { container, queryByText, getByTestId } = render(
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
      <ListRoutes t={t} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );

  const {container2} = render(<RouteDetails/>)

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('route list', () => {
    const {getAllByTestId} = render(<ListRoutes t={t} />);
    const routeNames = getAllByTestId('routeName').map(li => li.textContent);
    expect(routeNames.length).toBe(4);
    expect(routeNames).toEqual(routes.map(r => r.name));
  });

  test('details button', () => {
    const {getAllByTestId} = render(<ListRoutes t={t} />);
    fireEvent.click(getByTestId('details'));
    jest.spyOn(window.location, 'assign').mockImplementation( l => {
      expect(l).toContain('/route-details?routeId=');
   })
  });

  test('share button', () => {
    let wrapper = mount(<ListRoutes t={t} />);
    let instance = wrapper.instance();
    instance.componentDidMount = () => {
      return [
        new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
        new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
        new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
        new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
      ]
    };
    instance.setState({
      visible: true
    })
    expect(instance.state.visible).toBeTruthy();
  });
});