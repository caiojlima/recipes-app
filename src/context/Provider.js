import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

const Provider = ({ children }) => {
  const [meal, setMeal] = useState({ meals: [], idMeal: {}, list: [] });
  const [drink, setDrink] = useState({ drinks: [], idDrink: {} });

  const searchMealByName = async (name = '') => {
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const { meals } = await result.json();
    setMeal({ ...meal, meals });
  };

  const searchMealByIngredient = (ingredient = '') => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then(({ meals }) => setMeal({ ...meal, meals }));

  const searchMealByFirstLetter = (letter = '') => (
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((response) => response.json())
      .then(({ meals }) => setMeal({ ...meal, meals })));

  const searchMealByArea = (area) => (
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => response.json())
      .then(({ meals }) => setMeal({ ...meal, meals })));

  const searchMealById = (id) => (
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then(({ meals }) => setMeal({ ...meal, idMeal: meals[0] })));

  const filterMealByCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await response.json();
    setMeal({ ...meal, meals });
  };

  const searchDrinksByName = (name = '') => (
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => response.json())
      .then(({ drinks }) => setDrink({ ...drink, drinks })));

  const searchDrinksByFirstLetter = (letter = '') => (
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((response) => response.json())
      .then(({ drinks }) => setDrink({ ...drink, drinks })));

  const getListOfAreas = () => (
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json()));

  const searchDrinksByIngredient = (ingredient = '') => (
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then(({ drinks }) => setDrink({ ...drink, drinks })));

  const searchDrinkById = (id) => (
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then(({ drinks }) => setDrink({ ...drink, idDrink: drinks[0] })));

  const filterDrinkByCategory = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const { drinks } = await response.json();
    setDrink({ ...drink, drinks });
  };

  const generateRandomFood = () => (
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ meals }) => setMeal({ ...meal, meals }))
  );

  const generateRandomDrink = () => (
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ drinks }) => setDrink({ ...drink, drinks }))
  );

  const handleMeals = (type, value) => {
    switch (type) {
    case 'NAME':
      searchMealByName(value);
      break;
    case 'INGREDIENT':
      searchMealByIngredient(value);
      break;
    case 'LETTER':
      searchMealByFirstLetter(value);
      break;
    case 'ID':
      searchMealById(value);
      break;
    case 'RANDOM':
      generateRandomFood();
      break;
    case 'CATEGORY':
      filterMealByCategory(value);
      break;
    case 'AREA':
      searchMealByArea(value);
      break;
    default:
      break;
    }
  };

  const handleDrinks = (type, value) => {
    switch (type) {
    case 'NAME':
      searchDrinksByName(value);
      break;
    case 'INGREDIENT':
      searchDrinksByIngredient(value);
      break;
    case 'LETTER':
      searchDrinksByFirstLetter(value);
      break;
    case 'ID':
      searchDrinkById(value);
      break;
    case 'RANDOM':
      generateRandomDrink();
      break;
    case 'CATEGORY':
      filterDrinkByCategory(value);
      break;
    default:
      break;
    }
  };

  const context = {
    ...meal,
    ...drink,
    handleMeals,
    handleDrinks,
    getListOfAreas,
  };

  return (
    <RecipeContext.Provider value={ context }>
      { children }
    </RecipeContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
