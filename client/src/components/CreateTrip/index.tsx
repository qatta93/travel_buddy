import React from 'react';
import MainHeader from '../MainHeader';
import FormCreateTrip from './FormCreateTrip';
import './style.css';

const CreateTrip = () => (
  <main className="create-trip">
    <MainHeader
      title="Create the perfect trip !"
      links={[
        { name: 'home', href: '/' },
        { name: 'create', href: '/create-trip' },
      ]}
    />
    <section className="create-trip__form">
      <FormCreateTrip />
    </section>
    <img className="create-trip__img" src="/images/bg_desktop.png" alt="car" />
  </main>
);

export default CreateTrip;
