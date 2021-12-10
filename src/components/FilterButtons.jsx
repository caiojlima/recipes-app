import React from 'react';
import PropTypes from 'prop-types';

const FilterButtons = ({ callback }) => (
  <>
    <button
      data-testid="filter-by-food-btn"
      name="Food"
      type="button"
      onClick={ callback }
    >
      Food
    </button>
    <button
      data-testid="filter-by-drink-btn"
      name="Drinks"
      type="button"
      onClick={ callback }
    >
      Drinks
    </button>
    <button
      data-testid="filter-by-all-btn"
      name="All"
      type="button"
      onClick={ callback }
    >
      All
    </button>
  </>
);

FilterButtons.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default FilterButtons;
