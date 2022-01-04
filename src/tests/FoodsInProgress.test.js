import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import FoodsInProgress from '../pages/FoodsInProgress';

const fakeProp = { match: { params: { id: '52977' } } };

describe('Teste de funcionalidade do FoodInProgress', () => {
  test('Teste2', async () => {
    renderWithRouter(<Provider><FoodsInProgress { ...fakeProp } /></Provider>);
    const endRecipe = await screen.findByRole('link', { name: /Finalizar a Receita/i });
    expect(endRecipe).toBeInTheDocument();
  });
  test('Teste3', async () => {
    renderWithRouter(<Provider><FoodsInProgress { ...fakeProp } /></Provider>);
    const num = 13;
    const checkbox = await screen.findAllByTestId('check-progress');
    expect(checkbox).toHaveLength(num);
  });
  test('Teste4', async () => {
    const {
      history,
    } = renderWithRouter(<Provider><FoodsInProgress { ...fakeProp } /></Provider>);
    const checkbox = await screen.findAllByTestId('check-progress');
    checkbox.forEach((check) => {
      userEvent.click(check);
    });
    const endRecipe = await screen.findByRole('link', { name: /Finalizar a Receita/i });
    expect(endRecipe).not.toBeDisabled();

    userEvent.click(endRecipe);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
  test('Testa se ao clicar no botao de share salve no clipboard', async () => {
    renderWithRouter(<Provider><FoodsInProgress { ...fakeProp } /></Provider>);

    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    const shareButton = await screen.findByTestId('share-btn');
    shareButton.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/comidas/52977');
    const text = screen.getByText('Link copiado!');
    expect(text).toBeInTheDocument();
  });
  test('Teste5', async () => {
    renderWithRouter(<Provider><FoodsInProgress { ...fakeProp } /></Provider>);
    const btnFavorite = await screen.findByRole('button', { name: /favoritar/i });
    expect(btnFavorite).toBeInTheDocument();

    localStorage.clear();
    userEvent.click(btnFavorite);
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorite).toHaveLength(1);
  });
  test('Teste6', async () => {
    renderWithRouter(<Provider><FoodsInProgress { ...fakeProp } /></Provider>);
    localStorage.clear();
    const favoriteButton = await screen.findByRole('button', { name: 'Favoritar' });
    userEvent.click(favoriteButton);
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorite).toHaveLength(1);
    userEvent.click(favoriteButton);
    const favoriteAfter = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteAfter).toHaveLength(0);
  });
});
