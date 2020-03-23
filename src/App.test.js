import React from 'react';
import { cleanup } from 'react-testing-library';
import App from './App';

afterAll(cleanup);

describe('App', () => {
  it('renders without crashing', () => {
    expect(<App />).toBeTruthy();
  });
});
