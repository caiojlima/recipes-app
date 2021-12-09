import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';

const Foods = () => {
  const [categories, setCategories] = useState([]);
  const { meals, handleMeals } = useContext(RecipeContext);

  const ARRAY_LIMIT = 12;

  const fetchCategories = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals: categoriesArr } = await response.json();
    const BUTTONS_QUANTITY = 5;
    setCategories(categoriesArr.slice(0, BUTTONS_QUANTITY));
  };

  const handleButton = (category) => {
    handleMeals('CATEGORY', category);
  };

  useEffect(() => {
    handleMeals('NAME');
    fetchCategories();
  }, []);

  if (meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <>
      <Header />
      <CategoriesButtons callback={ handleButton } categories={ categories } />
      { !!meals && meals.slice(0, ARRAY_LIMIT).map((meal, i) => (
        <div key={ i } data-testid={ `${i}-recipe-card` }>
          <RecipeCard index={ i } name={ meal.strMeal } img={ meal.strMealThumb } />
        </div>
      )) }
      <Footer />
    </>
  );
};

export default Foods;
