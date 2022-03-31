import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrowIcon from './BackArrowIcon';
import './style.css';

interface ILink {
  href: string,
  name: string,
}

interface MainHeaderProps {
  links: ILink[],
  title: string,
}

const MainHeader = ({ links, title }: MainHeaderProps) => {
  const navigate = useNavigate();
  const Links = links
    .map((link, index) => {
      if (index === links.length - 1) {
        return (
          <span key={link.href}>
            <Link to={link.href} className="main-header__link main-header__link--active">
              {link.name}
            </Link>
          </span>
        );
      }
      return (
        <span key={link.href}>
          <Link to={link.href} className="main-header__link">
            {link.name}
          </Link>
          <span className="main-header__pipe">|</span>
        </span>
      );
    });

  return (
    <header className="main-header">
      <div className="main-header__nav">
        <button className="main-header__back" type="button" onClick={() => navigate(-1)}>
          <BackArrowIcon />
        </button>
        {Links}
      </div>
      <h1 className="main-header__title">{title}</h1>
    </header>
  );
};

export default MainHeader;
