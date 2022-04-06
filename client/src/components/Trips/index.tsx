import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router-dom';
import TripCard from '../TripCard';
import { ITrip } from '../../types';
import Maps from '../Search/Map';
import './style.css';

interface TripsProps {
  trips: ITrip[],
}

mapboxgl.accessToken = 'pk.eyJ1IjoidG9tODQiLCJhIjoiY2wxMXdqd2t4MDEzbTNjbXZ3eW81c2sxYiJ9.P0aH-Hn9LJ0dcCOPcAvmwQ';

const Trips = ({ trips }: TripsProps) => (
  <section className="trips">
    <h1 className="trips__title">Dream trips list:</h1>
    <Maps trips={trips} />
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
