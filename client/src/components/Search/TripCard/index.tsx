import React, { useEffect, useState } from 'react';
import './style.css';

interface CardInterface {
  id: number,
  authorId: number,
  authorUsername: string,
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

interface TripCardProps {
  trip: CardInterface
}

interface UserInterface {
  id: number,
  languages: string[],
  country: string,
}

const TripCard = ({ trip }:TripCardProps) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const userId = trip.authorId;

  useEffect(() => {
    const getUsersData = async () => {
      const response = await fetch(`http://localhost:5500/api/users/${userId}`);
      const data = await response.json();
      const userInfo = await data.data;
      setUser(userInfo);
    };
    getUsersData();
  }, []);

  console.log(user);

  const dateFromMonth = trip.from.split(/T.+/g)[0].split(/^.{5}/)[1].split('-')[0];
  const dateFromDay = trip.from.split(/T.+/g)[0].split(/^.{5}/)[1].split('-')[1];
  const dateFrom = `${dateFromDay}-${dateFromMonth}`;

  const dateToYear = trip.to.split(/T.+/g)[0].split('-')[0].split(/^.{2}/)[1];
  const dateToMonth = trip.to.split(/T.+/g)[0].split('-')[1];
  const dateToDay = trip.to.split(/T.+/g)[0].split('-')[2];
  const dateTo = `${dateToDay}-${dateToMonth}-${dateToYear}`;

  const countries = trip.countries.join(' | ');

  return (
    <article className="trips__offer">
      <div className="trips__info">
        <div className="trips__header">
          <h2 className="trips__country">{countries}</h2>
          <h2 className="trips__date">
            {dateFrom}
            {' '}
            -
            {' '}
            {dateTo}
          </h2>
        </div>
        <p className="trips__description">
          {trip.description}
        </p>
        <div className="trips__details">
          <p className="trips__seats">
            {trip.maxPassengers}
            {' '}
            seats
          </p>
          <p className="trips__gender">F / M</p>
          <p className="trips__budget">
            {trip.budget === null ? '' : `${trip.budget}$`}
          </p>
        </div>
        <div className="trips__host">
          <p className="trips__host-name">{trip.authorUsername}</p>
          <p className="trips__host-age">
            {trip.authorAge}
            {' '}
            y.o.
          </p>
          <p className="trips__host-country">{user === null ? null : user.country}</p>
          <p className="trips__host-language">{user === null ? null : user.languages.join(' | ')}</p>
          {/* <p className="trips__host-reviews">4.8 ★</p> */}
        </div>
      </div>
      <div className="trips__pic" />
    </article>
  );
};

export default TripCard;
