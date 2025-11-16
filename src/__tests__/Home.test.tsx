/**
 * Test for Home page hero section
 */

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from '@/pages/Home';

const renderWithProviders = (ui: React.ReactElement): void => {
  render(
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>,
  );
};

describe('Home Page', () => {
  it('renders hero with CTA buttons', () => {
    renderWithProviders(<Home />);

    // Check for gym name
    expect(screen.getByText(/247 Gym/i)).toBeInTheDocument();

    // Check for rating
    expect(screen.getByText(/4\.5/i)).toBeInTheDocument();

    // Check for CTAs
    expect(screen.getByText(/View Classes/i)).toBeInTheDocument();
    expect(screen.getByText(/Join Now/i)).toBeInTheDocument();

    // Check for 24 hours badge
    expect(screen.getByText(/Open 24 hours/i)).toBeInTheDocument();
  });
});

