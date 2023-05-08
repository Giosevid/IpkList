import React from 'react';
import Home from './index';
import { renderWithProviders } from 'IpkList/__mocks__/renderWithProviders';

const mockedStore = {
  api: {},
};

describe('Login screen', () => {
  it('Renders correctly', () => {
    const tree = renderWithProviders(<Home />, mockedStore).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
