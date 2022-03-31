import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => (
  <main className="home">
    <section className="home__content">
      <h1 className="home__title">FIND YOUR TRAVEL BUDDIES</h1>
      <div className="home__btn-container">
        <Link to="/trips" className="home__btn home__btn--primary">Find trip</Link>
        <Link to="/" className="home__btn">Create trip</Link>
      </div>
    </section>
    <section className="home__bg">
      <picture className="home__bg-picture">
        <source media="(orientation: landscape)" srcSet="/images/bg_desktop.png" />
        <img className="home__bg-image" src="/images/bg_mobile.png" alt="van background" />
      </picture>
    </section>
  </main>
);

export default Home;
