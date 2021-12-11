import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';

describe('Testando a página principal de Receitas', () => {
  beforeEach(() => {
    renderWithRouter(<Provider><App /></Provider>);
  });

  test('testa se renderiza os elementos na tela', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
});
