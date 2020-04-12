import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { ListRoutes } from '../list-routes.component';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  RouteDetails
} from '../list-routes.style';
import {Route} from '@models'

import { RouteService } from '@services';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(RouteService, 'getAllShared').mockImplementationOnce(() => {
  return Promise.resolve([
    new Route('Ruta 1', 'Descripción 1', 10, 10, 5, 'Javier'),
    new Route('Ruta 2', 'Descripción 2', 10, 10, 4, 'Javier'),
    new Route('Ruta 3', 'Descripción 3', 10, 10, 3, 'Javier'),
    new Route('Ruta 4', 'Descripción 4', 10, 10, 2, 'Javier')
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
      <ListRoutes t={t} history = {history} webId={'Isabel'} getAll = {RouteService.getAllShared}/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );

  const {container2} = render(<RouteDetails/>);

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('route list', () => {
    const {getAllByTestId} = render(<ListRoutes t={t} webId={'Isabel'} getAll = {RouteService.getAllShared}/>);
    const routeNames = getAllByTestId('routeName').map(li => li.textContent);
    expect(routeNames.length).toBe(4);
    expect(routeNames).toEqual(routes.map(r => r.name));
    expect(getAllByTestId('createdBy').length).toBe(4);
  });

  test('list shared routes buttons', () => {
    const {queryAllByTestId} = render(<ListRoutes t={t} webId={'Isabel'} getAll = {RouteService.getAllShared}/>);
    expect(queryAllByTestId('details').length).toBe(4);
    expect(queryAllByTestId('addMilestone').length).toBe(0);
    expect(queryAllByTestId('share').length).toBe(0);
    expect(queryAllByTestId('delete').length).toBe(4);
  })

});