import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';

const RecipeMadeCard = ({ index, img, name, date, tags }) => (
  <>
    <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
    <h2 data-testid={ `${index}-horizontal-top-text` }>{name}</h2>

    <img
      width="200px"
      data-testid={ `${index}-horizontal-image` }
      src={ img }
      alt="Recipe Favorite"
    />
    {!!tags.length && tags.map((tag) => (
      <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
    ))}
    <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
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
  </>
);

RecipeMadeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecipeMadeCard;
