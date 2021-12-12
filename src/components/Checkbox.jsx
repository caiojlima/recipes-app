import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Checkbox({ check, handleCheck, ingredient }) {
  const [teste, setTeste] = useState(false);
  return (
    <input
      type="checkbox"
      className="checkbox"
      onClick={ ({ target: { checked } }) => setTeste(checked) }
      onChange={ () => handleCheck(ingredient) }
      checked={ teste || check }
    />
  );
}

Checkbox.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default Checkbox;
