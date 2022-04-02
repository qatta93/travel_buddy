import React from 'react';
import MainHeader from '../MainHeader';
import FormCreateTrip from './FormCreateTrip';

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
  </main>
);

export default CreateTrip;
