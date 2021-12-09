import React from 'react';
import PropTypes from 'prop-types';

const CategoriesButtons = ({ categories }) => (
  <div>
    { categories.map(({ strCategory, i }) => (
      <button
        key={ i }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
      >
        {strCategory}

      </button>
    )) }
  </div>
);

CategoriesButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesButtons;
