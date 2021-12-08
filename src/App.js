import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Explore from './pages/Explore';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/explorar" component={ Explore } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
