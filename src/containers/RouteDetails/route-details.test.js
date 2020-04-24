import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import {
  cleanup,
  queryByAttribute,
  render,
  fireEvent, 
  getByTestId
} from 'react-testing-library';

import {
  Header,
  TextEditorContainer,
  TextEditorWrapper
} from './route-details.style';
import { useTranslation } from 'react-i18next';
import { RouteDetails } from './route-details.component';
import { createMemoryHistory } from 'history';

describe('Add Route', () => {
  afterAll(cleanup);

  const history = createMemoryHistory();
  const getById = queryByAttribute.bind(null, 'id');
  const { t } = useTranslation();

  const { container } = render(
    <Router>
      <RouteDetails history={history} webId={'https://fakeadri.solid.community/private/viade/108874618.ttl'} />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });


  test('Inputs render properly', async () => {

    const tRuta = getById(container, 'tituloRuta');
    const tHito = getById(container, 'tituloHito');
    const hitos = getById(container, 'hitos');

    expect(tRuta).not.toEqual(null);
    expect(tHito).not.toEqual(null); 
    expect(hitos).not.toEqual(null);

  });



});