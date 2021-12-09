import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

const SearchBar = ({ inputValue, pathname }) => {
  const [state, setState] = useState({ radioInput: 'INGREDIENT' });
  const { handleMeals, handleDrinks } = useContext(RecipeContext);

  const handleRadio = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  const handleMealsButton = () => {
    if (state.radioInput === 'LETTER' && inputValue.length === 1) {
      handleMeals(state.radioInput, inputValue);
    } else if (state.radioInput === 'LETTER') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      handleMeals(state.radioInput, inputValue);
    }
  };

  const handleDrinksButton = () => {
    if (state.radioInput === 'LETTER' && inputValue.length === 1) {
      handleDrinks(state.radioInput, inputValue);
    } else if (state.radioInput === 'LETTER') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      handleDrinks(state.radioInput, inputValue);
    }
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
          value="INGREDIENT"
          onChange={ handleRadio }
          checked={ state.radioInput === 'INGREDIENT' }
        />
      </label>
      <label htmlFor="name-search">
        Por Nome:
        <input
          type="radio"
          id="name-search"
          name="radioInput"
          data-testid="name-search-radio"
          value="NAME"
          onChange={ handleRadio }
          checked={ state.radioInput === 'NAME' }
        />
      </label>
      <label htmlFor="letter-search">
        Por Primeira Letra:
        <input
          type="radio"
          id="letter-search"
          name="radioInput"
          data-testid="first-letter-search-radio"
          value="LETTER"
          onChange={ handleRadio }
          checked={ state.radioInput === 'LETTER' }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ pathname === '/comidas' ? handleMealsButton : handleDrinksButton }
      >
        Pesquisar

      </button>
    </div>
  );
};

SearchBar.propTypes = {
  inputValue: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default SearchBar;
