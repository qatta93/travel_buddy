import React from 'react';
import { Link } from 'react-router-dom';
import TripCard from '../TripCard';
import { ITrip } from '../../types';
import './style.css';

interface TripsProps {
  trips: ITrip[],
}

const Trips = ({ trips }: TripsProps) => (
  <section className="trips">
    <h1 className="trips__title">Dream trips list:</h1>
    <div className="trips__list">
      {trips.map((trip:ITrip) => (
        <Link key={trip.id} to={`/trips/${trip.id}`} className="trips__item">
          <TripCard trip={trip} />
        </Link>
      ))}
    </div>
  </section>
);

export default Trips;
