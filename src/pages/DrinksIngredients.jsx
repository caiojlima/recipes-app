import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';

const DrinksIngredients = () => {
  const { drinks, handleDrinks } = useContext(RecipeContext);

  const sliceArray = () => {
    const ARRAY_LENGTH = 12;
    const mealArray = drinks.slice(0, ARRAY_LENGTH);
    console.log(mealArray);
    return mealArray;
  };

  useEffect(() => {
    handleDrinks('INGREDIENT', 'Gin');
  }, []);

  return (
    <>
      <Header />
      { sliceArray().length && sliceArray().map((meal, i) => (
        <div key={ Number(meal.idDrink) } data-testid={ `${i}-ingredient-card` }>
          <IngredientCard meal={ meal } index={ i } name="strDrink" img="strDrinkThumb" />
        </div>
      )) }
    </>
  );
};

export default DrinksIngredients;
