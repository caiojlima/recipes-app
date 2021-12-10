import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';

const FavoritesCard = ({ index, name, category, area, img }) => (
  <div>
    <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
    <img data-testid={ `${index}-horizontal-image` } src={ img } alt="Recipe Favorite" />
    <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
    <button
      type="button"
      src={ shareIcon }
      data-testid={ `${index}-horizontal-share-btn` }
    >
      Share
    </button>
    <button
      type="button"
      src={ blackIcon }
      data-testid={ `${index}-horizontal-favorite-btn` }
    >
      Desfavoritar
    </button>
  </div>
);

FavoritesCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default FavoritesCard;
