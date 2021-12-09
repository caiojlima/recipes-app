import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Drinks = () => {
  const { drinks } = useContext(RecipeContext);
  const CARD_LIMT = 12;

  if (drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <>
      <Header />
      { !!drinks && drinks.slice(0, CARD_LIMT).map((drink, i) => (
        <div key={ i } data-testid={ `${i}-recipe-card` }>
          <RecipeCard index={ i } name={ drink.strDrink } img={ drink.strDrinkThumb } />
        </div>
      )) }
      <Footer />
    </>
  );
};

export default Drinks;
