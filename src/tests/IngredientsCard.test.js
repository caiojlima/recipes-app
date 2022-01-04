import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import FoodsIngredients from '../pages/FoodIngredients';

describe('Teste de funcionalidade do IngredientsCards', () => {
  test('Teste', async () => {
    renderWithRouter(<Provider><FoodsIngredients /></Provider>);
    const firstIngredient = await screen.findByRole('heading',
      { name: /chicken/i, level: 1 });
    expect(firstIngredient).toBeInTheDocument();
  });
  test('Teste2', async () => {
    renderWithRouter(<Provider><FoodsIngredients /></Provider>);

    const imgIgredient = await screen.findAllByTestId(/ingredient-card$/);
    userEvent.click(imgIgredient[1]);
  });
});
