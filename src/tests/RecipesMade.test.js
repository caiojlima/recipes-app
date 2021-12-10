import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import RecipesMade from '../pages/RecipesMade';

describe('Testando a página principal de Receitas', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  beforeEach(() => {
    renderWithRouter(<Provider><RecipesMade /></Provider>);
  });

  test('testa se renderiza os elementos na tela', async () => {
    const title = screen.getByTestId('page-title');
    const profileButton = screen.getByTestId('profile-top-btn');
    const nameRadio = screen.getByTestId('name-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const filterButton = screen.getByTestId('exec-search-btn');
    const filterByFoodButton = screen.getByTestId('filter-by-food-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');
    const card0 = screen.getByTestId('0-horizontal-name');
    const card1 = screen.getByTestId('1-horizontal-name');
    const shareBtn0 = screen.getByTestId('0-horizontal-share-btn');
    const shareBtn1 = screen.getByTestId('1-horizontal-share-btn');

    expect(title).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(filterByAllButton).toBeInTheDocument();
    expect(filterByDrinkButton).toBeInTheDocument();
    expect(filterByFoodButton).toBeInTheDocument();
    expect(card0).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
    expect(shareBtn0).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();

    userEvent.click(filterByAllButton);
    userEvent.click(filterByDrinkButton);
    userEvent.click(filterByFoodButton);
    const mockClipboard = { writeText: jest.fn() };
    global.navigator.clipboard = mockClipboard;
    userEvent.click(shareBtn0);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/comidas/52771');
    const copyMessage = screen.getByText('Link copiado!');
    expect(copyMessage).toBeInTheDocument();
    userEvent.click(shareBtn0);
    expect(copyMessage).not.toBeInTheDocument();
  });
});
