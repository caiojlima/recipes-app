import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  container, supreseMe, containerFood, buttonsExplore,
} from '../styles/Explore.module.css';

const ExploreFood = () => {
  const { meals, handleMeals } = useContext(RecipeContext);

  useEffect(() => {
    handleMeals('RANDOM');
  });

  return (
    <div className={ container }>
      <Header />
      <section className={ containerFood }>
        <div>
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              className={ buttonsExplore }
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              className={ buttonsExplore }
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        </div>
        <Link to={ meals.length ? `/comidas/${meals[0].idMeal}` : '' }>
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

export default ExploreFood;
