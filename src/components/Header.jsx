import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  const [toggleInput, setToggleInput] = useState(false);
  const { location: { pathname } } = useHistory();

  const handleInput = () => (
    toggleInput ? setToggleInput(false) : setToggleInput(true)
  );

  const toggleTitle = (path) => {
    switch (path) {
    case '/comidas':
      return 'Comidas';
    case '/bebidas':
      return 'Bebidas';
    case '/explorar':
      return 'Explorar';
    case '/explorar/comidas':
      return 'Explorar Comidas';
    case '/explorar/bebidas':
      return 'Explorar Bebidas';
    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/perfil':
      return 'Perfil';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    default:
      return '';
    }
  };

  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone de Perfil" />
      </Link>
      <h1 data-testid="page-title">
        {
          toggleTitle(pathname)
        }
      </h1>
      {(pathname !== '/explorar'
      && pathname !== '/explorar/comidas'
      && pathname !== '/explorar/bebidas'
      && pathname !== '/explorar/comidas/ingredientes'
      && pathname !== '/explorar/bebidas/ingredientes'
      && pathname !== '/perfil'
      && pathname !== '/receitas-feitas'
      && pathname !== '/receitas-favoritas')
      && (
        <button onClick={ handleInput } type="button">
          <img
            src={ searchIcon }
            alt="Icone de Pesquisa"
            data-testid="search-top-btn"
          />
        </button>)}
      {
        toggleInput && <input type="text" data-testid="search-input" />
      }
      <SearchBar />
    </div>
  );
};

export default Header;
