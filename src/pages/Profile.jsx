import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header />
      <p data-testid="profile-email">{ !!user && user.email }</p>
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
          onClick={ () => localStorage.clear() }
          data-testid="profile-logout-btn"
          type="button"
        >
          Sair
        </button>
      </Link>
      <Footer />
    </>
  );
};

export default Profile;
