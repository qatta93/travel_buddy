import React from 'react';
import { IUser } from '../../../types';
import './style.css';

interface DisplayUserProps {
  user:IUser,
}

const DisplayCard = ({ user }: DisplayUserProps) => (
  <article className="display-card__container">
    <img className="display-card__avatar" alt="user's avatar" src={user.avatar === null ? '/images/avatar.webp' : user.avatar} />
    <div className="display-card__info">
      <p className="display-card__info-key">Name:</p>
      <p className="display-card__info-value">
        {user.name}
      </p>
    </div>
    <div className="display-card__info">
      <p className="display-card__info-key">Username:</p>
      <p className="display-card__info-value">
        {user.username}
      </p>
    </div>
    <div className="display-card__info">
      <p className="display-card__info-key">Age:</p>
      <p className="display-card__info-value">
        {user.age}
      </p>
    </div>
    <div className="display-card__info">
      <p className="display-card__info-key">Country:</p>
      <p className="display-card__info-value">
        {user.country}
      </p>
    </div>
    <div className="display-card__info">
      <p className="display-card__info-key">Gender:</p>
      <p className="display-card__info-value">
        {user.gender}
      </p>
    </div>
    <div className="display-card__info">
      <p className="display-card__info-key">Languages:</p>
      <p className="display-card__info-value">
        {user.languages.map((l) => l.language).join(', ')}
      </p>
    </div>
    <div className="display-card__summary">
      <p className="display-card__summary-title">
        About Me
      </p>
      <p className="display-card__summary-text">
        {user.summary}
      </p>
    </div>
  </article>
);

export default DisplayCard;
