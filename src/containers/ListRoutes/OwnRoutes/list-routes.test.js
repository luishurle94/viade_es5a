import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { ListRoutes } from '../list-routes.component';
import ListOwnRoutesComponent from './list-routes.component';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  RouteDetails
} from '../list-routes.style';
import { Route } from '@models'

import { RouteService } from '@services';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(RouteService, 'getAll').mockImplementationOnce(() => {
  return Promise.resolve([
    new Route('Ruta 1', 'Descripción 1', 10, 10, 5, 'Isabel'),
    new Route('Ruta 2', 'Descripción 2', 10, 10, 4, 'Isabel'),
    new Route('Ruta 3', 'Descripción 3', 10, 10, 3, 'Isabel'),
    new Route('Ruta 4', 'Descripción 4', 10, 10, 2, 'Isabel')
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
    <ListOwnRoutesComponent history={history} webId={'Isabel'} />
  )

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('route list', () => {
    const { getAllByTestId } = render(<ListRoutes t={t} getAll={RouteService.getAll} />);
    const routeNames = getAllByTestId('routeName').map(li => li.textContent);
    expect(routeNames.length).toBe(4);
    expect(routeNames).toEqual(routes.map(r => r.name));
  });

  test('list own routes buttons', () => {
    const { getAllByTestId } = render(<ListRoutes t={t} webId={'Isabel'} getAll={RouteService.getAll} />);
    let buttons = getAllByTestId('details');
    expect(buttons.length).toBe(4);
    buttons = getAllByTestId('addMilestone');
    expect(buttons.length).toBe(4);
    buttons = getAllByTestId('share');
    expect(buttons.length).toBe(4);
    buttons = getAllByTestId('delete');
    expect(buttons.length).toBe(4);
  })


});