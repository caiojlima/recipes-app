import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/FavoritesRecipes.module.css';

const FilterButtons = ({ callback }) => (
  <div className={ styles.containerButtons }>
    <button
      data-testid="filter-by-food-btn"
      name="Food"
      type="button"
      onClick={ callback }
      className={ styles.filterButtons }
    >
      Food
    </button>
    <button
      data-testid="filter-by-drink-btn"
      name="Drinks"
      type="button"
      onClick={ callback }
      className={ styles.filterButtons }
    >
      Drinks
    </button>
    <button
      data-testid="filter-by-all-btn"
      name="All"
      type="button"
      onClick={ callback }
      className={ styles.filterButtons }
    >
      All
    </button>
  </div>
);

FilterButtons.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default FilterButtons;
