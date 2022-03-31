import React from 'react';
import Form from './Form';
import Trips from './Trips';
import MainHeader from '../MainHeader';
import './style.css';

const Search = () => {
  console.log('Search');

  return (
    <main className="search">
      <MainHeader title="Find your perfect trip !" links={[{ name: 'home', href: '/' }, { name: 'trips', href: '/trips' }]} />
      <section className="search__form">
        <Form />
        <Trips />
      </section>

    </main>
  );
};

export default Search;
