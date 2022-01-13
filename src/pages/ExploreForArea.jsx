import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Selected from '../components/Selected';
import RecipeContext from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const ExploreForArea = () => {
  const { handleMeals, meals, getListOfAreas } = useContext(RecipeContext);
  const [state, setState] = useState({ dropdownArea: 'All' });
  const [list, setList] = useState([{}]);

  const LIMIT = 12;

  useEffect(() => {
    getListOfAreas().then(({ meals: listArea }) => {
      setList(listArea);
      handleMeals('NAME');
    });
  }, [getListOfAreas, handleMeals]);

  useEffect(() => {
    if (state.dropdownArea === 'All') {
      handleMeals('NAME');
    }
    if (state.dropdownArea !== 'All') {
      handleMeals('AREA', state.dropdownArea);
    }
  }, [state.dropdownArea]);

  function handleSelected({ target: { name, value } }) {
    setState({ ...state, [name]: value });
  }

  return (
    <div>
      <Header />
      <Selected
        options={ list }
        labelValue="Escolha um país"
        id="dropdownArea"
        testIdDrop="explore-by-area-dropdown"
        handleSelected={ handleSelected }
      />
      {
        meals.slice(0, LIMIT).map((ele, index) => (
          <RecipeCard
            idMeal={ ele.idMeal }
            key={ `${ele.strMeal}-${index}` }
            name={ ele.strMeal }
            img={ ele.strMealThumb }
            index={ index }
            type="comidas"
          />
        ))
      }
      <Footer />
    </div>
  );
};

export default ExploreForArea;
