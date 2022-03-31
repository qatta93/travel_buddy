import React from 'react';
import MainHeader from '../MainHeader';
import './style.css';

const Profile = () => {
  console.log('bla');

  return (
    <main className="profile">
      <MainHeader title="Nice to see you, Alejandro!" links={[{ name: 'home', href: '/' }, { name: 'profile', href: '/profile' }]} />
      <div className="profile__bcg">
        <section className="profile__buttons">
          <button type="submit" className="profile__btn">My profile account</button>
          <button type="submit" className="profile__btn">My reviews</button>
          <button type="submit" className="profile__btn">Messages</button>
          <button type="submit" className="profile__btn">My trips</button>
          <button type="submit" className="profile__btn profile__btn--logout">LOGOUT</button>
        </section>
      </div>
      <img className="profile__img" src="/images/bg_desktop.png" alt="car" />
    </main>
  );
};

export default Profile;
