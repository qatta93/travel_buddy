import React from 'react';
import { IUser } from '../../../types';
import './style.css';

interface DisplayUserProps {
  user:IUser,
}

const DisplayCard = ({ user }: DisplayUserProps) => (
  <main className="display-user__container">
    <img className="display-user__avatar" alt="user's avatar" src={user.avatar === null ? '/images/avatar.webp' : user.avatar} />
    <article className="display-user__info">
      <p className="display-user__info-key">Name:</p>
      <p className="display-user__info-value">
        {user.name}
      </p>
    </article>
    <article className="display-user__info">
      <p className="display-user__info-key">Username:</p>
      <p className="display-user__info-value">
        {user.username}
      </p>
    </article>
    <article className="display-user__info">
      <p className="display-user__info-key">Age:</p>
      <p className="display-user__info-value">
        {user.age}
      </p>
    </article>
    <article className="display-user__info">
      <p className="display-user__info-key">Country:</p>
      <p className="display-user__info-value">
        {user.country}
      </p>
    </article>
    <article className="display-user__info">
      <p className="display-user__info-key">Gender:</p>
      <p className="display-user__info-value">
        {user.gender}
      </p>
    </article>
    <article className="display-user__info">
      <p className="display-user__info-key">Languages:</p>
      <p className="display-user__info-value">
        {user.languages.map((l) => l.language).join(', ')}
      </p>
    </article>
    <article className="display-user__summary">
      <p className="display-user__summary-title">
        About Me
      </p>
      <p className="display-user__summary-text">
        {user.summary}
      </p>
    </article>
    <div className="display-user__car-bcg" />
  </main>
);

export default DisplayCard;
