import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './assets/renderWithRouter';
import Provider from '../context/Provider';
import Foods from '../pages/Foods';

describe('Teste de funcionalidade do ShearchBar', () => {
  test('Teste', async () => {
    renderWithRouter(<Provider><Foods /></Provider>);
    const search = await (await screen.findByTestId('search-top-btn')).parentNode;
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const radio = await screen.findByLabelText('Por Ingrediente:');
    expect(radio).toBeInTheDocument();
    userEvent.click(radio);

    const input = await (await screen.findByTestId('search-input'));
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'Corba');

    const find = await screen.findByRole('button', { name: 'Pesquisar' });
    expect(find).toBeInTheDocument();
    userEvent.click(find);
  });
});
