import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';

describe('Testa funcionamento da página de perfil', () => {
  test('Verifica se todos os elementos são carregados', () => {
    renderWithRouter(<Provider><App /></Provider>);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'caio@gmail.com');
    userEvent.type(passwordInput, '123123123');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(profileBtn).toBeInTheDocument();

    userEvent.click(profileBtn);

    const title = screen.getByText('Perfil');
    const email = screen.getByText('caio@gmail.com');
    const receitasFeitas = screen.getByTestId('profile-done-btn');
    const receitasFav = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');
    const drinksBTN = screen.getByTestId('drinks-bottom-btn');
    const foodBTN = screen.getByTestId('food-bottom-btn');
    const explore = screen.getByTestId('explore-bottom-btn');

    expect(email).toBeInTheDocument();
    expect(receitasFav).toBeInTheDocument();
    expect(receitasFeitas).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(drinksBTN).toBeInTheDocument();
    expect(foodBTN).toBeInTheDocument();
    expect(explore).toBeInTheDocument();

    userEvent.click(logout);
  });
});
