import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Selected from '../components/Selected';
import RecipeContext from '../context/RecipeContext';

const ExploreForArea = () => {
  const { handleMeals, list } = useContext(RecipeContext);
  const [state, setState] = useState({ dropdownArea: 'All' });

  useEffect(() => {
    handleMeals('LIST');
  }, []);

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
      <Footer />
    </div>
  );
};

export default ExploreForArea;
