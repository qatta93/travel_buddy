import React, { useEffect, useState } from 'react';
import TripCard from '../TripCard';
import './style.css';

interface TripInterface {
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

const Trips = () => {
  const [trips, setTrips] = useState<TripInterface[]>([]);
  useEffect(() => {
    const getTripsData = async () => {
      const response = await fetch('http://localhost:5500/api/trips');
      const data = await response.json();
      const trip = await data.data;
      setTrips(trip);
    };
    getTripsData();
  }, []);

  return (
    <section className="trips">
      <h1 className="trips__title">Dream trips list:</h1>
      <div className="trips__list">
        {trips.map((trip:TripInterface) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
};

export default Trips;
