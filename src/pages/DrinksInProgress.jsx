import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import storage from '../storage';
import blackIcon from '../images/blackHeartIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';

function DrinksInProgress({ match: { params: { id } } }) {
  const [update, setUpdate] = useState(storage.isFavoriteRecipe(id, 'bebida'));
  const [linkCopied, setLinkCopiado] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { handleDrinks, idDrink } = useContext(RecipeContext);

  useEffect(() => {
    handleDrinks('ID', id);
  }, []);

  const handleFavorite = (recipe, callback) => {
    const isFavorite = storage.isFavoriteRecipe(recipe.idDrink, 'bebida');
    if (!isFavorite) {
      storage.addFavoriteRecipe(recipe, 'bebida');
      callback(true);
      return;
    }
    storage.removeFavoriteRecipe(recipe.idDrink);
    callback(false);
  };

  const favorite = (update)
    ? blackIcon : whiteIcon;

  const { strDrinkThumb, strDrink, strCategory, strInstructions } = idDrink;

  const recipeArray = Object.entries(idDrink);
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

  function handleChec() {
    const array = [];
    document.querySelectorAll('.teste').forEach((e) => {
      array.push(e.checked);
    });
    const check = array.every((e) => e === true);
    if (check) return setDisabled(false);
    setDisabled(true);
  }

  return (
    <>
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h1 data-testid="recipe-category">{ strCategory }</h1>
      {
        howToDo.map(({ ingredient, measurement }, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" onChange={ handleChec } className="teste" />
            {`${ingredient} ${measurement}`}
          </li>))
      }
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        src={ favorite }
        data-testid="favorite-btn"
        type="button"
        onClick={ () => handleFavorite(idDrink, setUpdate) }
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
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabled }
        >
          Finalizar a Receita
        </button>
      </Link>
    </>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinksInProgress;
