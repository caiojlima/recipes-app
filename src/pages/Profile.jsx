import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import storage from '../storage';

const Profile = () => {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header />
      <p data-testid="profile-email">{ email }</p>
      <Link to="/receitas-feitas">
        <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          onClick={ storage.cleanAllLocalStorage }
          data-testid="profile-logout-btn"
          type="button"
        >
          Sair
        </button>
      </Link>
    </>
  );
};

export default Profile;
