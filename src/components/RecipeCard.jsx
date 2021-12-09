import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ name, index, img }) => (
  <>
    <h1 data-testid={ `${index}-card-name` }>{name}</h1>
    <img data-testid={ `${index}-card-img` } src={ img } alt="Recipe Pic" />
  </>
);

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default RecipeCard;
