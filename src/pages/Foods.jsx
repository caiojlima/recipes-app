import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';
import FoodsStyle from '../styles/Foods.module.css';

const Foods = () => {
  const [categories, setCategories] = useState([]);
  const [wasClicked, setWasClicked] = useState(false);
  const { meals, handleMeals,
    isIngredient, handleIngredient } = useContext(RecipeContext);

  const ARRAY_LIMIT = 12;

  const fetchCategories = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals: categoriesArr } = await response.json();
    const BUTTONS_QUANTITY = 5;
    setCategories(categoriesArr.slice(0, BUTTONS_QUANTITY));
  };

  const handleButton = (category) => {
    if (wasClicked[category] || category === 'All') {
      handleMeals('NAME');
    } else {
      handleMeals('CATEGORY', category);
    }
    setWasClicked({ [category]: !wasClicked[category] });
  };

  useEffect(() => {
    if (!isIngredient) {
      handleMeals('NAME');
      fetchCategories();
    }
  }, []);

  useEffect(() => () => {
    handleIngredient(false);
  }, []);

  if (meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div>
      <Header />
      <div className={ FoodsStyle.optionsContainer }>
        <CategoriesButtons callback={ handleButton } categories={ categories } />
      </div>
      <div className={ FoodsStyle.cardContainer }>
        { !!meals && meals.slice(0, ARRAY_LIMIT).map((meal, i) => (
          <div className={ FoodsStyle.card } key={ i }>
            <RecipeCard
              key={ i }
              index={ i }
              name={ meal.strMeal }
              img={ meal.strMealThumb }
              idMeal={ meal.idMeal }
              type="comidas"
            />
          </div>
        )) }
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
