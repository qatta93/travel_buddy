import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from './HamburgerIcon';
import CloseIcon from './CloseIcon';
import './style.css';

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded((currentState) => !currentState);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo-container">
          <img className="header__logo" src="/images/logo.png" alt="van logo" />
          <h2 className="header__title">Travel Buddy</h2>
        </div>
        <div className="header__menu-container">
          <button type="button" className="header__button" onClick={toggleNav} aria-label="toggle-nav">
            { isNavExpanded ? <CloseIcon /> : <HamburgerIcon />}
          </button>
          <ul className={`header__links-container ${isNavExpanded ? 'header__links-container--visible' : ''}`}>
            <Link to="/" className="header__link">HOME</Link>
            <Link to="/trips" className="header__link">TRIPS</Link>
            <Link to="/login" className="header__link">LOGIN</Link>
            <Link to="/about-us" className="header__link">ABOUT US</Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
