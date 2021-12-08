import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';

const ExploreFood = () => {
  const { meals, handleMeals } = useContext(RecipeContext);

  useEffect(() => {
    handleMeals('RANDOM');
  });

  return (
    <>
      <Header />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <Link to={ meals.length ? `/comidas/${meals[0].idMeal}` : '' }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
    </>
  );
};

export default ExploreFood;
