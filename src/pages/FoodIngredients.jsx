import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import styles from '../styles/IngredientCard.module.css';

const FoodsIngredients = () => {
  const [state, setState] = useState([]);

  const fetchIngredientsList = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const { meals: meals2 } = await response.json();
    setState(meals2);
  };

  const sliceArray = () => {
    const ARRAY_LENGTH = 12;
    const mealArray = state.slice(0, ARRAY_LENGTH);
    return mealArray;
  };

  useEffect(() => {
    fetchIngredientsList();
  }, []);

  return (
    <section className={ styles.containerIngredients }>
      <Header />
      <section className={ styles.containerIngredientsCards }>
        { !!sliceArray().length && sliceArray().map((meal, i) => (
          <div key={ i } className={ styles.cards }>
            <IngredientCard
              ingredientId={ `${i}-ingredient-card` }
              meal={ meal }
              index={ i }
              name="strIngredient"
              type="comidas"
              img="themeal"
            />
          </div>
        )) }
      </section>
      <Footer />
    </section>
  );
};

export default FoodsIngredients;
