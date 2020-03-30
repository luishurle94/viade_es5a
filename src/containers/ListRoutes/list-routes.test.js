import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup, fireEvent, screen } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListRoutes } from './list-routes.component';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header
} from './list-routes.style';
import {Route} from '@models'

import * as RouteService from './../../../test/__mocks__/services/route-service';

jest.mock('../../services/route/route-service')

describe('List routes', () => {
  afterAll(cleanup);

  const routes = [
    new Route('Ruta 1', 'Descripción 1', 10, 10, 5),
    new Route('Ruta 2', 'Descripción 2', 10, 10, 4),
    new Route('Ruta 3', 'Descripción 3', 10, 10, 3),
    new Route('Ruta 4', 'Descripción 4', 10, 10, 2)
  ];

  const { t } = useTranslation();  

  const { container } = render(
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
      <ListRoutes t={t} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('route list', () => {
    const {getAllByTestId} = render(<ListRoutes t={t} />);
    const routeNames = getAllByTestId('routesNames').map(li => li.textContent);
    expect(routeNames.length).toBe(4);
    expect(routeNames).toEqual(routes.map(r => r.name));
  })
});