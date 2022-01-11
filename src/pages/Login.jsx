import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import storage from '../storage';
import loginStyle from '../styles/Login.module.css';

const Login = () => {
  const [state, setState] = useState({ email: '', password: '', isButtonDisabled: true });

  useEffect(() => {
    const EMAIL_REGEX = /\S+@\S+\.\S+/.test(state.email);
    const PASSWORD_LENGTH = 6;
    if (EMAIL_REGEX && state.password.length > PASSWORD_LENGTH) {
      setState({ email: state.email, password: state.password, isButtonDisabled: false });
      return;
    }
    setState({ email: state.email, password: state.password, isButtonDisabled: true });
  }, [state.password, state.email]);

  function handleChange({ target: { name, value } }) {
    setState({ email: state.email, password: state.password, [name]: value });
  }

  function handleSubmit() {
    storage.saveUserOnStorage(state.email);
    storage.saveTokensOnStorage();
  }

  return (
    <div className={ loginStyle.container }>
      <h2 className={ loginStyle.title }>Recipe Heaven</h2>
      <input
        data-testid="email-input"
        type="email"
        name="email"
        onChange={ handleChange }
        value={ state.email }
        className={ loginStyle.email }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        onChange={ handleChange }
        value={ state.password }
        className={ loginStyle.password }
      />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ state.isButtonDisabled }
          onClick={ handleSubmit }
          className={ loginStyle.button }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
};

export default Login;
