import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => (
  <main className="home">
    <section className="home__content">
      <h1 className="home__title">FIND YOUR TRAVEL BUDDIES</h1>
      <div className="home__btn-container">
        <Link to="/trips" className="home__btn home__btn--primary">Find trip</Link>
        <Link to="/create-trip" className="home__btn">Create trip</Link>
      </div>
    </section>
    <section className="home__bg">
      <picture className="home__bg-picture">
        <video autoPlay muted loop className="home__bg-video">
          <source src={window.screen.orientation.type === 'landscape-primary' ? '/videos/carDesktop.mp4' : '/videos/carMobile.mp4'} type="video/mp4" />
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
        </video>
      </picture>
    </section>
  </main>
);

export default Home;
