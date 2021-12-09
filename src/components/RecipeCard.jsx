import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeCard = ({ name, index, img, idMeal, type }) => (
  <div>
    <Link
      to={ `/${type}/${idMeal}` }
      data-testid={ `${index}-recipe-card` }
    >
      Entrar
    </Link>
    <h1 data-testid={ `${index}-card-name` }>{name}</h1>
    <img data-testid={ `${index}-card-img` } src={ img } alt="Recipe Pic" />
  </div>
);

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  idMeal: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeCard;
