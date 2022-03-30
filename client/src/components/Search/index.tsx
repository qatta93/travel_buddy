import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import Trips from './Trips';
import BackArrowIcon from './BackArrowIcon';
import './style.css';

const Search = () => {
  console.log('Search');

  return (
    <main className="search">
      <header className="main-header">
        <div className="main-header__nav">
          <BackArrowIcon />
          <Link to="/" className="main-header__link">Home</Link>
          <span className="main-header__pipe">|</span>
          <Link to="/search" className="main-header__link main-header__active">Search</Link>
        </div>
        <h1 className="main-header__title">Find your perfect trip!</h1>
      </header>
      <section className="search__form">
        <Form />
        <Trips />
      </section>

    </main>
  );
};

export default Search;
