import React from 'react';
import MainHeader from '../MainHeader';
import './style.css';

const About = () => (
  <section className="about">
    <MainHeader
      title="Coding Nomads Team"
      links={[
        { name: 'home', href: '/' },
        { name: 'about-us', href: '/about-us' },
      ]}
    />
    <p className="about__team-text">
      <span className="about__team-text--span">Alejandro</span>
      <span className="about__team-text--span">Patrycja</span>
      <span className="about__team-text--span">Thomas</span>
    </p>
    <section className="about__content-container">
      <div className="about__paragraph-wrapper">
        <p className="about__paragraph">
          Hi and welcome to our final project! We are three aspirant web developers
          who went through the salt bootcamp by learning and working on labs together.
        </p>
        <p className="about__paragraph">
          We would like to think we are a friendly and dynamic team. We all have
          worked/studied and travelled in far places and are now based in Oslo/Stockholm
          aspiring to launch our careers as web developers.
        </p>
        <p className="about__paragraph">
          Feel free to have a chat with any of us.
        </p>
      </div>
      <section className="about_team">
        <img className="about__team-image" src="/images/codingNomads.jpg" alt="coding nomads team" />
      </section>
    </section>
    <section className="about__bg">
      <picture className="about__bg-picture">
        <source media="(orientation: landscape)" srcSet="/images/bg_desktop.png" />
        <img className="home__bg-image" src="/images/bg_mobile.png" alt="van background" />
      </picture>
    </section>
  </section>
);

export default About;
