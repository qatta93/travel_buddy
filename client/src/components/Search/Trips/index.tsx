import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../../../helpers/api';
import TripCard from '../TripCard';
import { ITrip } from '../../../types';
import './style.css';

const Trips = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  useEffect(() => {
    const getTripsData = async () => {
      const data = await fetchApi<ITrip[]>('/api/trips');
      if (data.status === 'error') {
        return;
      }
      const trip = await data.data;
      setTrips(trip);
    };
    getTripsData();
  }, []);

  console.log(trips);

  return (
    <section className="trips">
      <h1 className="trips__title">Dream trips list:</h1>
      <div className="trips__list">
        {trips.map((trip:ITrip) => (
          <Link to={`/trips/${trip.id}`} className="trips__item">
            <TripCard key={trip.id} trip={trip} />
          </Link>
        ))}
      </div>
      <div className="trips__car-bcg" />
    </section>
  );
};

export default Trips;
