import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import HamburgerIcon from './HamburgerIcon';
import CloseIcon from './CloseIcon';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchApi } from '../../helpers/api';
import { addUser } from '../../slices/user';
import './style.css';

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const data = await fetchApi('/api/auth/logout', {
      method: 'POST',
    });

    if (data.status === 'error') {
      console.error(data.message);
      return;
    }

    dispatch(addUser(null));
    setIsNavExpanded(false);
    navigate('/');
  };

  const toggleNav = () => {
    window.scrollTo(0, 0);
    setIsNavExpanded((currentState) => !currentState);
  };

  const handleLink = () => {
    setIsNavExpanded(false);
  };

  return (
    <>
      <div className={`placeholder ${isNavExpanded ? 'placeholder--visible' : ''}`} />
      <header className={`header ${isNavExpanded ? 'header--fixed' : ''}`}>
        <nav className="header__nav">
          <Link className="header__logo-container" to="/" onClick={handleLink}>
            <img className="header__logo" src="/images/logo.png" alt="van logo" />
            <h2 className="header__title">Travel Buddy</h2>
          </Link>
          <div className="header__menu-container">
            <button type="button" className="header__button" onClick={toggleNav} aria-label="toggle-nav">
              { isNavExpanded ? <CloseIcon /> : <HamburgerIcon />}
            </button>
            <ul className={`header__links-container ${isNavExpanded ? 'header__links-container--visible' : ''}`}>
              <NavLink className="header__link" to="/" onClick={handleLink}>Home Page</NavLink>
              <NavLink className="header__link" to="/trips" onClick={handleLink} end>Trips</NavLink>
              <NavLink className="header__link" to="/users" onClick={handleLink} end>Users</NavLink>
              {user ? (
                <>
                  <NavLink className="header__link" to="/create-trip" onClick={handleLink}>Create Trip</NavLink>
                  <NavLink className="header__link header__link--yellow" to="/profile" onClick={handleLink} end>Profile</NavLink>
                </>
              ) : (
                <NavLink className="header__link header__link--yellow" to="/login" onClick={handleLink}>Login</NavLink>
              )}
              <NavLink className="header__link header__link--blue" to="/about-us" onClick={handleLink}>About Us</NavLink>
              {user && (
                <button type="button" className="header__logout" onClick={handleLogout}>Logout</button>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
