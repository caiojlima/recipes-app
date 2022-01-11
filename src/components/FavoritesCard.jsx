import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import storage from '../storage';
import styles from '../styles/FavoritesRecipes.module.css';

const FavoritesCard = ({ index, name, category, area, img, type, id, callback }) => {
  const [isCopied, setIsCopied] = useState(false);

  const toggleCopy = () => {
    setIsCopied(!isCopied);
  };

  const handleFavorite = () => {
    storage.removeFavoriteRecipe(id);
  };

  return (
    <div className={ styles.favoritesCard }>
      <Link to={ `/${type}s/${id}` }>
        <img
          width="200px"
          className={ styles.imageFavorite }
          data-testid={ `${index}-horizontal-image` }
          src={ img }
          alt="Recipe Favorite"
        />
      </Link>
      <div className={ styles.infos }>
        <Link to={ `/${type}s/${id}` }>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className={ styles.topText }
          >
            {`${area} - ${category}`}
          </p>
          <h1
            className={ styles.title }
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h1>
        </Link>

        <div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
              toggleCopy();
            } }
          >
            <img src={ shareIcon } alt="Botão de Compartilhar" />
          </button>
          <button
            type="button"
            src={ blackIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => { handleFavorite(); callback(id); } }
          >
            <img src={ blackIcon } alt="Botão de Favoritar" />
          </button>
        </div>
      </div>
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
