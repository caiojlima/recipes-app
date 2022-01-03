import React from 'react';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import Foods from '../pages/Foods';

describe('Testando a página principal de Receitas', () => {
  const fetch = jest.spyOn(global, 'fetch');

  test('testa se renderiza os elementos na tela', async () => {
    renderWithRouter(<Provider><Foods /></Provider>);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
