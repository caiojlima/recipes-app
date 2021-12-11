import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import FoodIngredients from '../pages/FoodIngredients';

describe('Testando a página principal de Receitas', () => {
  beforeEach(() => {
    renderWithRouter(<Provider><FoodIngredients /></Provider>);
  });

  test('testa se renderiza os elementos na tela', async () => {
    const title = screen.getByTestId('page-title');
    const profileButton = screen.getByTestId('profile-top-btn');
    const nameRadio = screen.getByTestId('name-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const filterButton = screen.getByTestId('exec-search-btn');

    const card0 = await screen.findByTestId('0-ingredient-card');
    const card1 = await screen.findByTestId('1-ingredient-card');
    const card2 = await screen.findByTestId('2-ingredient-card');
    const card3 = await screen.findByTestId('3-ingredient-card');
    const card4 = await screen.findByTestId('4-ingredient-card');
    const card5 = await screen.findByTestId('5-ingredient-card');
    const card6 = await screen.findByTestId('6-ingredient-card');
    const card7 = await screen.findByTestId('7-ingredient-card');
    const card8 = await screen.findByTestId('8-ingredient-card');
    const card9 = await screen.findByTestId('9-ingredient-card');
    const card10 = await screen.findByTestId('10-ingredient-card');
    const card11 = await screen.findByTestId('11-ingredient-card');

    expect(title).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(card0).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
    expect(card3).toBeInTheDocument();
    expect(card4).toBeInTheDocument();
    expect(card5).toBeInTheDocument();
    expect(card6).toBeInTheDocument();
    expect(card7).toBeInTheDocument();
    expect(card8).toBeInTheDocument();
    expect(card9).toBeInTheDocument();
    expect(card10).toBeInTheDocument();
    expect(card11).toBeInTheDocument();
  });
});
