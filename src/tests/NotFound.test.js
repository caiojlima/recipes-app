import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import NotFound from '../pages/NotFound';

describe('Testando a página NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<Provider><NotFound /></Provider>);
  });

  test('testa se renderiza os elementos na tela', () => {
    const headerName = screen.getByText(/not found/i);

    expect(headerName).toBeInTheDocument();
  });
});
