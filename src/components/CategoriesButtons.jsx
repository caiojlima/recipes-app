import React from 'react';
import PropTypes from 'prop-types';

const CategoriesButtons = ({ categories, callback }) => (
  <div>
    { categories.map(({ strCategory, i }) => (
      <button
        key={ i }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => callback(strCategory) }
      >
        {strCategory}

      </button>
    )) }
  </div>
);

CategoriesButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
};

export default CategoriesButtons;
