import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealsIcon from '../images/mealIcon.svg';
import '../Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="DrinksButton"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="ExploreButton"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealsIcon }
          alt="FoodButton"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
