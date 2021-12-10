import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import RecipeMadeCard from '../components/RecipeMadeCard';

const RecipesMade = () => {
  const [recipesMade, setRecipesMade] = useState([]);

  useEffect(() => {
    setRecipesMade(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <>
      <Header />
      <FilterButtons />
      { recipesMade && recipesMade.map((recipe, i) => (
        <div key={ i }>
          <RecipeMadeCard
            index={ i }
            name={ recipe.name }
            date={ recipe.doneDate }
            img={ recipe.image }
            tags={ recipe.tags }
            area={ (recipe.type === 'comida') ? recipe.area : recipe.alcoholicOrNot }
            category={ recipe.category }
            type={ recipe.type }
            id={ recipe.id }
          />
        </div>
      )) }
    </>
  );
};

export default RecipesMade;
