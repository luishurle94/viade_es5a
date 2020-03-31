import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
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
  const history = createMemoryHistory();

  const { container, queryByText, getByTestId } = render(
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
      <ListRoutes t={t} history = {history}/>
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
    let wrapper = mount(<ListRoutes t={t} history={history}/>);
    let instance = wrapper.instance();
    let r1 = new Route('Ruta 1', 'Descripción 1', 10, 10, 5);
    r1.webId = 'RutaId1';
    instance.componentDidMount = () => {
      return [
        new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
        new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
        new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
        new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
      ]
    };
    const spy = jest.spyOn(instance, 'seeDetails').mockImplementationOnce((route) => {
      history.push(`route-details?routeId=${route.webId}`)
    })
    instance.seeDetails(r1);
    expect(history.location.pathname).toBe('/route-details');
    expect(history.location.search).toBe('?routeId=RutaId1');
  });

  test('share button', () => {
    let wrapper = mount(<ListRoutes t={t} />);
    let instance = wrapper.instance();
    let r1 = new Route('Ruta 1', 'Descripción 1', 10, 10, 5);
    instance.componentDidMount = () => {
      return [
        new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
        new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
        new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
        new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
      ]
    };
    instance.share(r1);
    expect(instance.state.visible).toBeTruthy();
    expect(instance.state.selectedRoute).toBeTruthy();
  });

  test('send button in friends dialog', () => {
    let wrapper = mount(<ListRoutes t={t} />);
    let instance = wrapper.instance();
    let r1 = new Route('Ruta 1', 'Descripción 1', 10, 10, 5);
    instance.componentDidMount = () => {
      return [
        new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
        new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
        new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
        new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
      ]
    };
    instance.share(r1);
    instance.sendButton();
    expect(instance.state.visible).toBeFalsy();
    expect(instance.state.selectedRoute).toBeFalsy();
  })
});