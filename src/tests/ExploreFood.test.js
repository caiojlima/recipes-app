import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import ExploreFood from '../pages/ExploreFood';

describe('Testando a página principal de Receitas', () => {
  test('testa se renderiza os elementos na tela', () => {
    renderWithRouter(<Provider><ExploreFood /></Provider>);
    const title = screen.getByTestId('page-title');
    const profileButton = screen.getByTestId('profile-top-btn');
    const nameRadio = screen.getByTestId('name-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const filterButton = screen.getByTestId('exec-search-btn');
    const exploreIngredientButton = screen.getByTestId('explore-by-ingredient');
    const exploreAreaButton = screen.getByTestId('explore-by-area');
    const surpriseButton = screen.getByTestId('explore-surprise');

    expect(title).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(exploreIngredientButton).toBeInTheDocument();
    expect(exploreAreaButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });
});
