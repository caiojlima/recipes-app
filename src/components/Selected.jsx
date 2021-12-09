import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Selected extends Component {
  render() {
    const { testIdDrop, id, options, labelValue, handleSelected } = this.props;
    return (
      <label htmlFor={ id }>
        { labelValue }
        <select
          id={ id }
          data-testid={ testIdDrop }
          name={ id }
          onChange={ handleSelected }
        >
          <option value="All" data-testid="All-option">All</option>
          {
            options.map((area, index) => (
              <option
                key={ `${area}-${index}` }
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>
            ))
          }
        </select>
      </label>
    );
  }
}

Selected.propTypes = {
  handleSelected: PropTypes.func.isRequired,
  testIdDrop: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Selected;
