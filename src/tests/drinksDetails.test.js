import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import DrinksDetails from '../pages/DrinksDetails';
import storage from '../storage';

describe('Teste de funcionalidade do FoodDetails', () => {
  test('Testa se renderiza os elementos na tela', async () => {
    const fakeProp = { match: { params: { id: 13501 } } };
    renderWithRouter(<Provider><DrinksDetails { ...fakeProp } /></Provider>);

    const title = await screen.findByTestId('recipe-title');
    const photo = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const shareButton = await screen.findByTestId('share-btn');
    const instructions = await screen.findByTestId('instructions');
    const start = await screen.findByTestId('start-recipe-btn');

    // const testInDocument = (tested) => expect(tested).toBeInTheDocument();
    // const N_OF_RECOMENDATIONS = 6;
    const recomendations = await screen.findAllByTestId(/[\d]+-recomendation-card/);
    recomendations.forEach((recomendation) => {
      expect(recomendation).toBeInTheDocument();
      expect(recomendation.lastChild).toBeInTheDocument();
      expect(recomendation.lastChild.hasAttribute('src')).toBe(true);
    });
    const recTitle = await screen.findAllByTestId(/[\d]+-recomendation-title/);
    recTitle.forEach((recomendation) => expect(recomendation).toBeInTheDocument());
    expect(title).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.getAttribute('src')).toBe('whiteHeartIcon.svg');
    expect(shareButton).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(start).toBeInTheDocument();
  });
  test('Testa se ao clicar no botao de share salve no clipboard', async () => {
    const fakeProp = { match: { params: { id: 13501 } } };
    renderWithRouter(<Provider><DrinksDetails { ...fakeProp } /></Provider>);

    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    const shareButton = await screen.findByTestId('share-btn');
    shareButton.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/bebidas/13501');
    const text = screen.getByText('Link copiado!');
    expect(text).toBeInTheDocument();
  });

  test('se ao clicar no iniciar receita, ele muda de receita', async () => {
    const fakeProp = { match: { params: { id: 13501 } } };
    const { history } = renderWithRouter(
      <Provider><DrinksDetails { ...fakeProp } /></Provider>,
    );
    const start = await screen.findAllByTestId('start-recipe-btn');
    start[0].click();
    expect(history.location.pathname).toBe('/bebidas/13501/in-progress');
  });

  test('', async () => {
    storage.removeFavoriteRecipe = jest.fn();
    storage.addFavoriteRecipe = jest.fn();
    storage.isFavoriteRecipe = jest.fn();
    const fakeProp = { match: { params: { id: 13501 } } };
    renderWithRouter(<Provider><DrinksDetails { ...fakeProp } /></Provider>);
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(storage.isFavoriteRecipe).toHaveBeenCalled();
    favoriteButton.click();
    expect(storage.addFavoriteRecipe).toHaveBeenCalled();
  });
});
