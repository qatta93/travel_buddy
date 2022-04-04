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
      Alejandro Patrycja Thomas
    </p>
    <section className="about__content-container">
      <p className="about__paragraph">
        Hi and welcome to our final project! We are three aspirant web developers
        who went through the salt bootcamp by learning and working on labs together.
        We would like to think we are a friendly and dynamic team. We all have
        worked/studied and travelled in far places and are now based in Oslo/Stockholm
        aspiring to launch our careers as web developers. Feel free to have a chat
        with any of us.
      </p>
      <section className="about_team">
        <img className="about__team-image" src="/images/codingNomads.jpg" alt="coding nomads team" />
      </section>
    </section>
    {/* <video poster="/images/bg_desktop.png" autoplay="autoplay"
    loop="loop" controls="controls" width="640" height="360">
    <source src="/videos/mobile.mp4" type="video/mp4"></video> */}
    <section className="about__bg">
      <picture className="about__bg-picture">
        <source media="(orientation: landscape)" srcSet="/images/bg_desktop.png" />
        <img className="home__bg-image" src="/images/bg_mobile.png" alt="van background" />
      </picture>
    </section>
  </section>
);

export default About;
