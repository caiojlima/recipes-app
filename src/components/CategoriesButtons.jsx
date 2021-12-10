import React from 'react';
import PropTypes from 'prop-types';

const CategoriesButtons = ({ categories, callback }) => (
  <div>
    <button
      type="button"
      onClick={ () => callback('All') }
      data-testid="All-category-filter"
    >
      All

    </button>
    { categories.map(({ strCategory }) => (
      <button
        key={ strCategory }
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
