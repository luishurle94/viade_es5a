import React from 'react';
import { render, cleanup } from 'react-testing-library';
import App from './App';

afterAll(cleanup);

// const { container } = render();

describe('App', () => {
  it('renders without crashing', () => {
    expect(<App />).toBeTruthy();
  });
});
