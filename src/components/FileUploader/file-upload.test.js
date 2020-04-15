import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { FileUploader } from './file-upload.component';

describe('FileUploader', () => {
  afterAll(cleanup);
  const { container, rerender } = render(<FileUploader webId='prueba' routeId='prueba' t={(str) => ''} />);

  it('should render without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('should render ', () => {
    rerender(<FileUploader webId='' routeId='' t={(str) => ''} />);

    expect(document.querySelector('.Icon')).toBeTruthy();
  });

  it('should render FileUploader', () => {
    rerender(<FileUploader webId='' routeId='' t={(str) => ''} />);

    expect(document.querySelector('.FileUploader')).toBeTruthy();
  });

  it('should have card', () => {
    expect(document.querySelector('.Card')).toBeTruthy();
  });
});
