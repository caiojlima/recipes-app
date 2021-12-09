import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Foods = () => {
  const { meals } = useContext(RecipeContext);

  if (meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <>
      <Header />
      { !!meals && meals.map((meal, i) => (
        <div key={ i } data-testid={ `${i}-recipe-card` }>
          <RecipeCard index={ i } name={ meal.strMeal } img={ meal.strMealThumb } />
        </div>
      )) }
      <Footer />
    </>
  );
};

export default Foods;
