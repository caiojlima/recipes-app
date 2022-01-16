import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import storage from '../storage';
import blackIcon from '../images/blackHeartIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';
import Ingredients from '../components/Ingredients';

function FoodsInProgress({ match: { params: { id } } }) {
  const [update, setUpdate] = useState(storage.isFavoriteRecipe(id, 'comida'));
  const [linkCopied, setLinkCopiado] = useState('');
  const { handleMeals, idMeal } = useContext(RecipeContext);

  useEffect(() => {
    handleMeals('ID', id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { strMealThumb, strMeal, strCategory, strInstructions } = idMeal;

  const favorite = (update)
    ? blackIcon : whiteIcon;

  const handleFavorite = (recipe, callback) => {
    const isFavorite = storage.isFavoriteRecipe(recipe.idMeal, 'comida');
    if (!isFavorite) {
      storage.addFavoriteRecipe(recipe, 'comida');
      callback(true);
      return;
    }
    storage.removeFavoriteRecipe(recipe.idMeal);
    callback(false);
  };

  const recipeArray = Object.entries(idMeal);
  const ingredients = recipeArray.reduce((acc, recp) => {
    let accumulator = acc;
    if (recp[0].includes('Ingredient') && recp[1]) {
      accumulator = [...acc, recp[1]];
    }
    return accumulator;
  }, []);
  const measurements = recipeArray.reduce((acc, recp) => {
    let accumulator = acc;
    if (recp[0].includes('Measure') && recp[1]) {
      accumulator = [...acc, recp[1]];
    }
    return accumulator;
  }, []);
  const howToDo = Array(ingredients.length).fill().map((p, index) => (
    { ingredient: ingredients[index], measurement: measurements[index] }));

  return (
    <>
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h1 data-testid="recipe-category">{ strCategory }</h1>
      <Ingredients howToDo={ howToDo } type="meals" id={ id } />
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        src={ favorite }
        data-testid="favorite-btn"
        type="button"
        onClick={ () => handleFavorite(idMeal, setUpdate) }
      >
        Favoritar
      </button>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
          setLinkCopiado('Link copiado!');
        } }
      >
        Compartilhar
      </button>
      <h1>{linkCopied}</h1>
    </>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodsInProgress;
