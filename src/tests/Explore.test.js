import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import Explore from '../pages/Explore';

describe('Testando a página principal de Receitas', () => {
  test('testa se renderiza os elementos na tela', () => {
    renderWithRouter(<Provider><Explore /></Provider>);
    const title = screen.getByTestId('page-title');
    const profileButton = screen.getByTestId('profile-top-btn');
    const nameRadio = screen.getByTestId('name-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const filterButton = screen.getByTestId('exec-search-btn');
    const exploreFoodButton = screen.getByTestId('explore-food');
    const exploreDrinksButton = screen.getByTestId('explore-drinks');

    expect(title).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(exploreFoodButton).toBeInTheDocument();
    expect(exploreDrinksButton).toBeInTheDocument();
  });

  test('testa se os botoes de explorar comida tem o retorno necessario', async () => {
    const { history } = renderWithRouter(<Provider><Explore /></Provider>);
    const exploreFoodButton = screen.getByTestId('explore-food');
    userEvent.click(exploreFoodButton);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });
});
