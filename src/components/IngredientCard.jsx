import React from 'react';
import PropTypes from 'prop-types';

const IngredientCard = ({ meal, index, name, img }) => (
  <>
    <h1 data-testid={ `${index}-card-name` }>{meal[name]}</h1>
    <img
      data-testid={ `${index}-card-img` }
      src={ meal[img] }
      alt="Ingredient Pic"
    />
  </>
);

IngredientCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default IngredientCard;
