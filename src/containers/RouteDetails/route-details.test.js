import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import {
  cleanup,
  queryByAttribute,
  render,
} from 'react-testing-library';

import { RouteDetails } from './route-details.component';

describe('Add Route', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <RouteDetails />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  //tituloRuta, tituloHito, hitos, mapaDetalles

  test('Inputs render properly', async () => {

    const tRuta = getById(container, 'tituloRuta');
    const tHito = getById(container, 'tituloHito');
    const hitos = getById(container, 'hitos');

    expect(tRuta).not.toEqual(null);
    expect(tHito).not.toEqual(null); 
    expect(hitos).not.toEqual(null); 

  });

});