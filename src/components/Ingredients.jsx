import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import storage from '../storage';
import Checkbox from './Checkbox';

function Ingredients({ howToDo, id, type }) {
  const [disabled, setDisabled] = useState(true);
  const [ingredientCheck, setingredientCheck] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getLocal() {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!local) return setingredientCheck([]);
    if (!local[type]) return setingredientCheck([]);
    setingredientCheck(local[type][id]);
  }

  useEffect(() => {
    getLocal();
  }, [getLocal]);

  function handleCheck(ingredient) {
    storage.addInProgressRecipe(ingredient, type, id);
    const array = [];
    document.querySelectorAll('.checkbox').forEach((e) => {
      array.push(e.checked);
    });
    const check = array.every((e) => e === true);
    if (check) return setDisabled(false);
    setDisabled(true);
  }

  return (
    <>
      {
        howToDo.map(({ ingredient, measurement }, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <Checkbox
              handleCheck={ handleCheck }
              ingredient={ ingredient }
              check={ ingredientCheck.some((e) => e === ingredient) }
            />
            {`${ingredient} ${measurement}`}
          </li>
        ))
      }
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabled }
        >
          Finalizar a Receita
        </button>
      </Link>
    </>
  );
}

Ingredients.propTypes = {
  howToDo: PropTypes.arrayOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredients;
