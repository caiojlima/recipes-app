import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { container, buttonsExplore, explore } from '../styles/Explore.module.css';

const Explore = () => (
  <div className={ container }>
    <Header />
    <section className={ explore }>
      <Link to="/explorar/comidas">
        <button
          className={ buttonsExplore }
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          className={ buttonsExplore }
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
    </section>
    <Footer />
  </div>
);

export default Explore;
