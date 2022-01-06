import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { btn, btnContainer, email } from '../styles/Perfil.module.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header />
      <p className={ email } data-testid="profile-email">{ !!user && user.email }</p>
      <div className={ btnContainer }>
        <Link to="/receitas-feitas">
          <button
            className={ btn }
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas

          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className={ btn }
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            className={ btn }
            onClick={ () => localStorage.clear() }
            data-testid="profile-logout-btn"
            type="button"
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
