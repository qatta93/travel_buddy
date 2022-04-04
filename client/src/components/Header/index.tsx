import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HamburgerIcon from './HamburgerIcon';
import CloseIcon from './CloseIcon';
import { useAppSelector } from '../../hooks';
import './style.css';

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const toggleNav = () => {
    setIsNavExpanded((currentState) => !currentState);
  };

  const handleLink = (href: string) => {
    setIsNavExpanded(false);
    navigate(href);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo-container">
          <Link to="/"><img className="header__logo" src="/images/logo.png" alt="van logo" /></Link>
          <Link to="/"><h2 className="header__title">Travel Buddy</h2></Link>
        </div>
        <div className="header__menu-container">
          <button type="button" className="header__button" onClick={toggleNav} aria-label="toggle-nav">
            { isNavExpanded ? <CloseIcon /> : <HamburgerIcon />}
          </button>
          <ul className={`header__links-container ${isNavExpanded ? 'header__links-container--visible' : ''}`}>
            <button type="button" className="header__link" onClick={() => handleLink('/')}>Home Page</button>
            <button type="button" className="header__link" onClick={() => handleLink('/trips')}>Trips</button>
            {user ? (
              <>
                <button type="button" className="header__link" onClick={() => handleLink('/create-trip')}>Create Trip</button>
                <button type="button" className="header__link" onClick={() => handleLink('/profile')}>Profile</button>
              </>
            ) : (
              <button type="button" className="header__link header__link--yellow" onClick={() => handleLink('/login')}>Login</button>
            )}
            <button type="button" className="header__link header__link--blue" onClick={() => handleLink('/about-us')}>About Us</button>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
