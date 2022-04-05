import React, { useEffect, useState } from 'react';
import { parseGenderRestrictions, formatDatesTrip } from '../../helpers/misc';
import { fetchApi } from '../../helpers/api';
import { ITrip, IUser } from '../../types';
import './style.css';

interface TripCardProps {
  trip: ITrip
}

const TripCard = ({ trip }:TripCardProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const userId = trip.author.id;

  useEffect(() => {
    const getUsersData = async () => {
      const data = await fetchApi<IUser>(`/api/users/${userId}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      const userInfo = await data.data;
      setUser(userInfo);
    };
    getUsersData();
  }, []);

  const tripDates = formatDatesTrip(trip.from, trip.to);

  const countries = trip.countries.map((c) => c.country).join(' | ');

  const seatsLeft = Math.max(trip.maxPassengers - trip.requests.filter((r) => r.status === 'accepted').length, 0);

  return (
    <article className="trips__offer">
      <div className="trips__info">
        <div className="trips__header">
          <h2 className="trips__country">{countries}</h2>
          <h2 className="trips__date">
            {tripDates}
          </h2>
        </div>
        <p className="trips__description">
          {trip.summary}
        </p>
        <div className="trips__details">
          <p className="trips__seats">
            {seatsLeft}
            {' '}
            seats
          </p>
          <p className="trips__gender">
            {parseGenderRestrictions(trip.genderRestrictions)}
          </p>
          <p className="trips__budget">
            {trip.budget === null ? '' : `${trip.budget}$`}
          </p>
        </div>
        <div className="trips__host">
          <p className="trips__host-name">{trip.author.username}</p>
          <p className="trips__host-age">
            {trip.author.age}
            {' '}
            y.o.
          </p>
          <p className="trips__host-country">{user === null ? null : user.country}</p>
          <p className="trips__host-language">
            {user === null ? null : user.languages.map((l) => l.languageCode).join(' | ')}
          </p>
          {/* <p className="trips__host-reviews">4.8 ★</p> */}
        </div>
      </div>
      {trip.images === null ? <img src="https://ei.marketwatch.com/Multimedia/2019/02/25/Photos/ZH/MW-HE536_airpla_20190225131547_ZH.jpg?uuid=5fa81d1a-3929-11e9-9462-ac162d7bc1f7" alt="trip img" className="trips__pic" />
        : <img src={trip.images} alt="trip img" className="trips__pic" />}
    </article>
  );
};

export default TripCard;
