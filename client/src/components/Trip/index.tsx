import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../helpers/api';
import { ITrip } from '../../types';
import MainHeader from './MainHeader';
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
          <MainHeader
            title={`trip with ${trip.authorUsername} to ${trip.countries.join(', ')}`}
            links={[
              { href: '/', name: 'Home' },
              { href: '/trips', name: 'Trips' },
              { href: `/trips/${id}`, name: 'This trip' },
            ]}
          />
          <section className="trip__info">
            <div className="trip__dates">
              <p>{trip.from.toString().slice(0, 10)}</p>
              <p>-</p>
              <p>{trip.to.toString().slice(0, 10)}</p>
            </div>
            <p className="trip__description">{trip.description}</p>
            <div className="trip__other">
              <p>
                {trip.maxPassengers}
                {' '}
                seats left
              </p>
              <p>{trip.authorGender}</p>
              {trip.budget && (
                <p>
                  USD$
                  {trip.budget}
                </p>
              )}
            </div>
          </section>
        </>
      ) : <p>Loading...</p>}
    </main>
  );
};

export default Trip;
