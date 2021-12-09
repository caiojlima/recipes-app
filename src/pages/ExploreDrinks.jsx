import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExploreDrinks = () => {
  const { drinks, handleDrinks } = useContext(RecipeContext);

  useEffect(() => {
    handleDrinks('RANDOM');
  });

  return (
    <>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <Link to={ drinks.length ? `/bebidas/${drinks[0].idDrink}` : '' }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <Footer />
    </>
  );
};

export default ExploreDrinks;
