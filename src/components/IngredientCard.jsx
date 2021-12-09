import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const IngredientCard = ({ meal, index, name, type, img }) => (
  <>
    <h1 data-testid={ `${index}-card-name` }>{meal[name]}</h1>
    <Link to={ `/${type}/${index}` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.${img}db.com/images/ingredients/${meal[name]}-Small.png` }
        alt="Ingredient Pic"
      />
    </Link>
  </>
);

IngredientCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default IngredientCard;
