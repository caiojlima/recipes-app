import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Foods = () => {
  const { meals, handleMeals } = useContext(RecipeContext);

  const ARRAY_LIMIT = 12;

  useEffect(() => {
    handleMeals('NAME');
  }, []);

  if (meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <>
      <Header />
      { !!meals && meals.slice(0, ARRAY_LIMIT).map((meal, i) => (
        <div key={ i } data-testid={ `${i}-recipe-card` }>
          <RecipeCard index={ i } name={ meal.strMeal } img={ meal.strMealThumb } />
        </div>
      )) }
      <Footer />
    </>
  );
};

export default Foods;
