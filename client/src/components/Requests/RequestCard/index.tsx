import React from 'react';
import './style.css';

const RequestCard = () => (
  <article className="request-card">
    <header className="request-card__header">
      <h1 className="request-card__title">Thomas, 22.03</h1>
      <p className="request-card__email">fff@gmail.com</p>
    </header>
    <p className="request-card__text">Hey, can I join?</p>
    <div className="request-card__buttons">
      <button type="submit" className="request-card__button request-card__button--accept">accept</button>
      <button type="submit" className="request-card__button request-card__button--reject">reject</button>
    </div>
  </article>
);

export default RequestCard;
