import React from 'react';
import './style.css';

const About = () => (
  <section className="about">
    <section className="about__content-container">
      <h1 className="about__title">About Us</h1>
      <p className="about__paragraph">
        Some text for travel buddies that you maybe, probably, surely,
        are going to find interesting. Stay tuned... you are going to
        that trip you were planning. You are going to find tour travel
        buddy here!
      </p>
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
