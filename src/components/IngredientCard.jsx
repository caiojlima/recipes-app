import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

const IngredientCard = ({ meal, index, name, type, img }) => {
  const { handleMeals, handleDrinks } = useContext(RecipeContext);
  const { location: { pathname } } = useHistory();

  function ingredientsFilter(mealName) {
    if (pathname.includes('comidas')) handleMeals('INGREDIENT', mealName);
    handleDrinks('INGREDIENT', mealName);
  }

  return (
    <>
      <h1 data-testid={ `${index}-card-name` }>{meal[name]}</h1>
      <Link
        to={ `/${type}` }
        onClick={ () => ingredientsFilter(meal[name]) }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.${img}db.com/images/ingredients/${meal[name]}-Small.png` }
          alt="Ingredient Pic"
        />
      </Link>
    </>
  );
};

IngredientCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default IngredientCard;
