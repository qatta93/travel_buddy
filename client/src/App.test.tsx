import React from 'react';
import { screen } from '@testing-library/react';
import { renderWrapper } from './helpers/tests';
import App from './App';

test('renders learn react link', () => {
  renderWrapper(<App />);
  const header = screen.getByText(/travel buddy/i);
  expect(header).toBeInTheDocument();
});
