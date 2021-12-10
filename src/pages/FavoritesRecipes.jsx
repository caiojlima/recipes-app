import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoritesCard from '../components/FavoritesCard';

const FavoritesRecipes = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  return (
    <>
      <Header />
      { favorites.map((fav, i) => (
        <div key={ i }>
          <FavoritesCard
            area={ (fav.type === 'comida') ? fav.area : fav.alcoholicOrNot }
            img={ fav.image }
            index={ i }
            name={ fav.name }
            category={ fav.category }
          />
        </div>
      )) }
    </>
  );
};

export default FavoritesRecipes;
