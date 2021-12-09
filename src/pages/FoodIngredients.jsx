import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';

const FoodsIngredients = () => {
  const { meals, handleMeals } = useContext(RecipeContext);

  const sliceArray = () => {
    const ARRAY_LENGTH = 12;
    const mealArray = meals.slice(0, ARRAY_LENGTH);
    console.log(mealArray);
    return mealArray;
  };

  useEffect(() => {
    handleMeals('INGREDIENT');
  }, []);

  return (
    <>
      <Header />
      { sliceArray().length && sliceArray().map((meal, i) => (
        <div key={ Number(meal.idMeal) } data-testid={ `${i}-ingredient-card` }>
          <IngredientCard meal={ meal } index={ i } name="strMeal" img="strMealThumb" />
        </div>
      )) }
    </>
  );
};

export default FoodsIngredients;
