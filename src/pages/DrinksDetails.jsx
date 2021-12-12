import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import storage from '../storage';
import blackIcon from '../images/blackHeartIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';

const componentContainerStyle = {
  overflowX: 'scroll',
  display: 'flex',
  height: '200px',
  width: '200px',
};

const componentStyle = {
  width: '90px',
  height: '100px',
  flexBasis: '50px',
  margin: '15px',
};

const handleFavorite = (recipe, setUpdate) => {
  const isFavorite = storage.isFavoriteRecipe(recipe.idDrink, 'bebida');
  if (!isFavorite) {
    storage.addFavoriteRecipe(recipe, 'bebida');
    setUpdate(true);
    return;
  }
  storage.removeFavoriteRecipe(recipe.idDrink);
  setUpdate(false);
};

const renderRecipe = (
  { idDrink: recipe, state: meals, linkCopiado, setLinkCopiado, update, setUpdate },
) => {
  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = recipe;
  const favorite = (update)
    ? blackIcon : whiteIcon;
  const recipeArray = Object.entries(recipe);
  const MAX_NUMBER = 6;
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
  const isDoneRecipe = storage.isInProgressRecipe(recipe.idDrink, 'cocktails');
  const howToDo = Array(ingredients.length).fill().map((p, index) => (
    { ingredient: ingredients[index], measurement: measurements[index] }));
  console.log(howToDo);
  return (
    <>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="" />
      <h2 data-testid="recipe-title">{ strDrink }</h2>
      <p data-testid="recipe-category">{strCategory + strAlcoholic}</p>
      <button
        src={ favorite }
        data-testid="favorite-btn"
        type="button"
        onClick={ () => handleFavorite(recipe, setUpdate) }
      >
        Favoritar
      </button>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/bebidas/${recipe.idDrink}`);
          setLinkCopiado('Link copiado!');
        } }
      >
        Compartilhar
      </button>
      { !!linkCopiado && (<h1>{ linkCopiado }</h1>)}
      <ul>
        howToDo
        { howToDo.map(({ ingredient, measurement }, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} ${measurement}`}
          </li>)) }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <div style={ componentContainerStyle }>
        {meals.slice(0, MAX_NUMBER).map((meal, index) => (
          <div
            style={ componentStyle }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
            <img style={ { height: '70px' } } src={ meal.strMealThumb } alt="drink" />
          </div>
        ))}
      </div>
      {!storage.isDoneRecipe(recipe.idDrink)
        && (
          <Link to={ `/bebidas/${recipe.idDrink}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: '0%' } }
            >
              { isDoneRecipe
                ? 'Continuar Receita' : 'Iniciar Receita'}
            </button>
          </Link>
        )}
    </>
  );
};

const fetchFoods = async (setState) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  console.log('fetch', data.meals);
  setState(data.meals);
};

const DrinksDetails = ({ match: { params: { id } } }) => {
  const context = useContext(RecipeContext);
  const [state, setState] = useState();
  const [linkCopiado, setLinkCopiado] = useState('');
  const { handleDrinks, idDrink } = context;
  const [update, setUpdate] = useState(storage.isFavoriteRecipe(id, 'bebida'));
  useEffect(() => {
    handleDrinks('ID', id);
    fetchFoods(setState);
  }, [id]);
  console.log(context);
  console.log('state', state);
  return (
    <div>
      { !!Object.keys(idDrink).length && !!state && renderRecipe(
        { idDrink, state, linkCopiado, setLinkCopiado, update, setUpdate },
      )}
    </div>
  );
};

DrinksDetails.propTypes = {
  match: PropType.arrayOf(PropType.object).isRequired,
};

export default DrinksDetails;
