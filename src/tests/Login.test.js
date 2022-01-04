import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import Login from '../pages/Login';

describe('Testando a página inicial Login', () => {
  beforeEach(() => {
    renderWithRouter(<Provider><Login /></Provider>);
  });

  test('testa se renderiza os elementos na tela', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    const nameButton = screen.getByText(/entrar/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(nameButton).toBeInTheDocument();
  });

  test('Obtem e renderiza email', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@teste.com');
    expect(submitButton).toBeDisabled();
    userEvent.type(passwordInput, '1234');
    expect(submitButton).toBeDisabled();
    userEvent.type(passwordInput, '1234567');

    expect(emailInput.value).toBe('teste@teste.com');
    expect(passwordInput.value).toBe('1234567');
    expect(submitButton).toBeEnabled();

    userEvent.click(submitButton);
  });
});
