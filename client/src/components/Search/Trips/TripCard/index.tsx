import React from 'react';
import './style.css';

interface CardInterface {
  id: number,
  authorId: number,
  authorAge: number,
  authorGender: string,
  from: string,
  to: string,
  maxPassengers: number,
  summary: string,
  budget: number,
  description: string,
  images: string,
  countries: string[],
  passengers: number[],
}

const TripCard = ({
  id, authorId, authorAge, authorGender, from, to,
  maxPassengers, summary, budget, description, images, countries, passengers
}):CardInterface => {
  console.log('blabl');

  return (
    <article className="trips__offer">
      <div className="trips__info">
        <div className="trips__header">
          <h2 className="trips__country">Portugal</h2>
          <h2 className="trips__date">10-25.04.22</h2>
        </div>
        <p className="trips__description">
          blablablablablablablab lablablabla blablablablablab lablablabla
        </p>
        <div className="trips__details">
          <p className="trips__seats">5 seats</p>
          <p className="trips__gender">F / M</p>
          <p className="trips__budget">5000$</p>
        </div>
        <div className="trips__host">
          <p className="trips__host-name">Alejandro</p>
          <p className="trips__host-age">30 y.o.</p>
          <p className="trips__host-country">Chile</p>
          <p className="trips__host-language">ES|EN</p>
          <p className="trips__host-reviews">4.8 ★</p>
        </div>
      </div>
      <div className="trips__pic" />
    </article>
  );
};

export default TripCard;
