import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import FoodsDetails from './pages/FoodDetails';
import DrinksDetails from './pages/DrinksDetails';
import FoodIngredients from './pages/FoodIngredients';
import DrinksIngredients from './pages/DrinksIngredients';
import RecipesMade from './pages/RecipesMade';
import Profile from './pages/Profile';
import FavoritesRecipes from './pages/FavoritesRecipes';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import NotFound from './pages/NotFound';
import ExploreForArea from './pages/ExploreForArea';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/comidas" render={ (props) => <Foods { ...props } /> } />
          <Route exact path="/bebidas" render={ (props) => <Drinks { ...props } /> } />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ (props) => <FoodsInProgress { ...props } /> }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ (props) => <DrinksInProgress { ...props } /> }
          />
          <Route
            path="/bebidas/:id"
            render={ (props) => <DrinksDetails { ...props } /> }
          />
          <Route
            path="/comidas/:id"
            render={ (props) => <FoodsDetails { ...props } /> }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ FoodIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ DrinksIngredients }
          />
          <Route exact path="/explorar/comidas/area" component={ ExploreForArea } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/receitas-feitas" component={ RecipesMade } />
          <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
          <Route exact path="/explorar/comidas" component={ ExploreFood } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route exact path="/*" component={ NotFound } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
