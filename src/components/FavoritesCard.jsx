import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import storage from '../storage';

const FavoritesCard = ({ index, name, category, area, img, type, id, callback }) => {
  const [isCopied, setIsCopied] = useState(false);

  const toggleCopy = () => {
    setIsCopied(!isCopied);
  };

  const handleFavorite = () => {
    storage.removeFavoriteRecipe(id);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
        <img
          width="200px"
          data-testid={ `${index}-horizontal-image` }
          src={ img }
          alt="Recipe Favorite"
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
          toggleCopy();
        } }
      >
        Share
      </button>
      <button
        type="button"
        src={ blackIcon }
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => { handleFavorite(); callback(id); } }
      >
        Desfavoritar
      </button>
      { isCopied && <h3>Link copiado!</h3> }
    </div>
  );
};

FavoritesCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default FavoritesCard;
