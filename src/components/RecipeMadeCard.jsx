import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const RecipeMadeCard = ({ index, img, name, date, tags, area, category, type, id }) => {
  const [isCopied, setIsCopied] = useState(false);

  const toggleCopy = () => {
    setIsCopied(!isCopied);
  };
  return (
    <>
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
        <img
          width="200px"
          data-testid={ `${index}-horizontal-image` }
          src={ img }
          alt="Recipe Favorite"
        />
      </Link>
      <h2 data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</h2>
      {!!tags.length && tags.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      ))}
      <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
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
      { isCopied && <h3>Link copiado!</h3> }
    </>
  );
};

RecipeMadeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeMadeCard;
