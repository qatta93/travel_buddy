import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import './style.css';

const Home = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <main className="home">
      <section className="home__content">
        <h1 className="home__title">FIND YOUR TRAVEL BUDDIES</h1>
        <h2>
          {user ? user.username : 'user not logged in'}
        </h2>
        <div className="home__btn-container">
          <Link to="/trips" className="home__btn home__btn--primary">Find trip</Link>
          <Link to="/create-trip" className="home__btn">Create trip</Link>
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
};

export default Home;
