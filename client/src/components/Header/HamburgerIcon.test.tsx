import React from 'react';
import { render, screen } from '@testing-library/react';
import HamburgerIcon from './index';

describe('HamburgerIcon', () => {
  test('should display header', () => {
    render(<HamburgerIcon />);

    expect(screen.getByAltText(/van logo/)).toBeInTheDocument();
    expect(screen.getByText(/travel buddy/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryAllByText(/link/)).toHaveLength(3);
  });
});
