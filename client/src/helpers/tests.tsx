import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

interface ContextProps {
  children: JSX.Element;
}

const Context = ({ children }: ContextProps): JSX.Element => (
  <MemoryRouter>
    {children}
  </MemoryRouter>
);

export const renderWrapper = (Component: JSX.Element) => (
  render(Component, { wrapper: Context })
);
