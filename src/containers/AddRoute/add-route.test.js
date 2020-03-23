import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import AddRoute from './add-route.component';

describe('Add Route', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <AddRoute />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
  
  test('Inputs render properly', async () => {
    
    const nameInput = getById(container, 'nameId');
    const descriptionInput = getById(container, 'descriptionId');
    const rankInput = getById(container, 'rankId');

    expect(nameInput).not.toBe(null);
    expect(descriptionInput).not.toBe(null);
    expect(rankInput).not.toBe(null);

  });

  test('Input name changes value', async () => {
    
    const nameInput = getById(container, 'nameId');
    const query = 'Manhattan Route';
    const mockChange = jest.fn();
    expect(nameInput.value).toEqual('R01');
    nameInput.onChange = mockChange;

    fireEvent.change(nameInput, { target: { value: query } });
    expect(nameInput.value).toEqual('Manhattan Route');

  });

  test('Input description changes value', async () => {
    
    const descriptionInput = getById(container, 'descriptionId');
    const query = 'What a lovely day';
    const mockChange = jest.fn();
    expect(descriptionInput.value).toEqual('');
    descriptionInput.onChange = mockChange;

    fireEvent.change(descriptionInput, { target: { value: query } });
    expect(descriptionInput.value).toEqual('What a lovely day');

  });

  test('Input rank changes value', async () => {
    
    const rankInput = getById(container, 'rankId');
    const query = '10';
    const mockChange = jest.fn();
    expect(rankInput.value).toEqual('5');
    rankInput.onChange = mockChange;

    fireEvent.change(rankInput, { target: { value: query } });
    expect(rankInput.value).toEqual('10');

  });

  test('Input rank does not support non numeric values', async () => {
    
    const rankInput = getById(container, 'rankId');
    const query = 'abcdef';
    const mockChange = jest.fn();
    expect(rankInput.value).toEqual('10');
    rankInput.onChange = mockChange;

    fireEvent.change(rankInput, { target: { value: query } });

    expect(rankInput.value).toEqual('');

  });

  test('Add Route Form Submission with Incorrect Values', async () => {
    
    const formInput = getById(container, 'formId');
    const mockChange = jest.fn();
    formInput.onSubmit = mockChange;

    fireEvent.change(formInput);

  });


});