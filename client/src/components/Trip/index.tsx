import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../helpers/api';
import { ITrip } from '../../types';
import MainHeader from '../MainHeader';
import UserCard from './UserCard';
import { parseGenderRestrictions } from '../../helpers/misc';
import './style.css';

const Trip = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const data = await fetchApi<ITrip>(`/api/trips/${id}`);
      if (data.status === 'error') {
        return;
      }
      setTrip(data.data);
    };

    fetchTrip();
  }, []);

  return (
    <main className="trip">
      {trip ? (
        <>
          <section className="trip__main-header">
            <MainHeader
              title={`trip with ${trip.authorUsername} to ${trip.countries.join(', ')}`}
              links={[
                { href: '/', name: 'Home' },
                { href: '/trips', name: 'Trips' },
                { href: `/trips/${id}`, name: 'Details' },
              ]}
            />
          </section>
          <section className="trip__info">
            <div className="trip__dates">
              <p>{trip.from.slice(0, 10)}</p>
              <p className="trip__dates-dash">-</p>
              <p>{trip.to.slice(0, 10)}</p>
            </div>
            <p className="trip__description">{trip.description}</p>
          </section>
          <section className="trip__other">
            <p>
              {trip.maxPassengers - trip.passengers.length}
              {' '}
              seats left
            </p>
            <p>{parseGenderRestrictions(trip.genderRestrictions)}</p>
            {trip.budget && (
              <p>
                USD$
                {trip.budget}
              </p>
            )}
          </section>
          <section className="trip__img-container">
            <img src={trip.images || '/images/rockies.jpeg'} alt="trip" className="trip__img" />
          </section>
          <section className="trip__user-card">
            <UserCard id={trip.authorId} />
          </section>
          <section className="trip__button-container">
            <button
              className="trip__request-button"
              type="button"
            >
              Send request!
            </button>
          </section>
        </>
      ) : <p>Loading...</p>}
    </main>
  );
};

export default Trip;
