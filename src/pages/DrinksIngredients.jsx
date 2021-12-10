import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';

const DrinksIngredients = () => {
  const [state, setState] = useState([]);

  const fetchIngredientsList = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const { drinks } = await response.json();
    setState(drinks);
  };

  const sliceArray = () => {
    const ARRAY_LENGTH = 12;
    const drinksArray = state ? state.slice(0, ARRAY_LENGTH) : [];
    return drinksArray;
  };

  useEffect(() => {
    fetchIngredientsList();
  }, []);

  return (
    <>
      <Header />
      { sliceArray().map((meal, i) => (
        <div key={ i }>
          <IngredientCard
            ingredientId={ `${i}-ingredient-card` }
            id={ i }
            meal={ meal }
            index={ i }
            name="strIngredient1"
            type="bebidas"
            img="thecocktail"
          />
        </div>
      )) }
      <Footer />
    </>
  );
};

export default DrinksIngredients;
