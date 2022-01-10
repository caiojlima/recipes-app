import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  container, supreseMe, containerDrink, buttonsExplore,
} from '../styles/Explore.module.css';

const ExploreDrinks = () => {
  const { drinks, handleDrinks } = useContext(RecipeContext);

  useEffect(() => {
    handleDrinks('RANDOM');
  });

  return (
    <div className={ container }>
      <Header />
      <section className={ containerDrink }>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className={ buttonsExplore }
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes

          </button>
        </Link>
        <Link to={ drinks.length ? `/bebidas/${drinks[0].idDrink}` : '' }>
          <button
            className={ supreseMe }
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
