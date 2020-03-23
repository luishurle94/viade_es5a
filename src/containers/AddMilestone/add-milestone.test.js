import React from 'react';
import { render, cleanup, queryByAttribute } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { AddMilestone } from './add-milestone.component';

describe('Add Route', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <AddMilestone />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('Inputs render properly', async () => {
    
    const routeToAdd = getById(container, 'routeToAddId');
    const radio1 = getById(container, 'radio1Id');
    const radio2 = getById(container, 'radio2Id');
    const name = getById(container, 'nameId');
    const description = getById(container, 'descriptionId');
    const latitude = getById(container, 'latitudeId');
    const longitude = getById(container, 'longitudeId');
    const altitude = getById(container, 'altitudeId');

    expect(routeToAdd).not.toBe(null);
    expect(radio1).not.toBe(null);
    expect(radio2).not.toBe(null);
    expect(name).not.toBe(null);
    expect(description).not.toBe(null);
    expect(latitude).not.toBe(null);
    expect(longitude).not.toBe(null);
    expect(altitude).not.toBe(null);

  });

});