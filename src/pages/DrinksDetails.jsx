import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import storage from '../storage';
import blackIcon from '../images/blackHeartIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';
import Details from '../styles/Details.module.css';

const componentContainerStyle = {
  overflowX: 'scroll',
  overflowY: 'hidden',
  display: 'flex',
  height: '100px',
  width: '200px',
};

const componentStyle = {
  width: '90px',
  height: '100px',
  flexBasis: '50px',
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
  return (
    <>
      <div className={ Details.imgContainer }>
        <img className={ Details.recipeImg } data-testid="recipe-photo" src={ strDrinkThumb } alt="" />
        <h2 className={ Details.recipeTitle } data-testid="recipe-title">{ strDrink }</h2>
        <p className={ Details.recipeCategory } data-testid="recipe-category">{strCategory}</p>
        <button
          className={ Details.favoritar }
          src={ favorite }
          data-testid="favorite-btn"
          type="button"
          onClick={ () => handleFavorite(recipe, setUpdate) }
        >
          .
        </button>
        <button
          className={ Details.compartilhar }
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000/bebidas/${recipe.idDrink}`);
            setLinkCopiado('Link copiado!');
          } }
        >
          .
        </button>
      </div>
      { !!linkCopiado && (<h1>{ linkCopiado }</h1>)}
      <strong className={ Details.ulTitle }>How To Prepare:</strong>
      <ul className={ Details.ingredients }>
        { howToDo.map(({ ingredient, measurement }, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} ${measurement}`}
          </li>)) }
      </ul>
      <h2 className={ Details.ulTitle }>Instructions</h2>
      <p className={ Details.instructions } data-testid="instructions">{strInstructions}</p>
      <h2 className={ Details.ulTitle }>Recomendations</h2>
      <div className={ Details.carrosel } style={ componentContainerStyle }>
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
              className={ Details.startRecipe }
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
  return (
    <div>
      { !!Object.keys(idDrink).length && !!state && renderRecipe(
        { idDrink, state, linkCopiado, setLinkCopiado, update, setUpdate },
      )}
    </div>
  );
};

DrinksDetails.propTypes = {
  match: PropType.oneOfType([PropType.object, PropType.array]).isRequired,
};

export default DrinksDetails;
