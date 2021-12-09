import React, { useState } from 'react';

const SearchBar = () => {
  const [state, setState] = useState({ radioInput: 'ingredient' });

  const handleRadio = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  return (
    <div>
      <label htmlFor="ingredient-search">
        Por Ingrediente:
        <input
          type="radio"
          id="ingredient-search"
          name="radioInput"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleRadio }
          checked={ state.radioInput === 'ingredient' }
        />
      </label>
      <label htmlFor="name-search">
        Por Nome:
        <input
          type="radio"
          id="name-search"
          name="radioInput"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleRadio }
          checked={ state.radioInput === 'name' }
        />
      </label>
      <label htmlFor="letter-search">
        Por Primeira Letra:
        <input
          type="radio"
          id="letter-search"
          name="radioInput"
          data-testid="first-letter-search-radio"
          value="letter"
          onChange={ handleRadio }
          checked={ state.radioInput === 'letter' }
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Pesquisar</button>
    </div>
  );
};

export default SearchBar;
