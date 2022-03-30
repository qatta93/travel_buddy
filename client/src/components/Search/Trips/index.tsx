import React, { useEffect, useState } from 'react';
import TripCard from './TripCard';
import './style.css';

// we need to add author languages

interface TripsInterface {
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

const tripsInitialValue = {
  id: 0,
  authorId: 0,
  authorAge: 0,
  authorGender: 'male',
  from: '2022-03-30T00:00:00.000Z',
  to: '2022-03-30T00:00:00.000Z',
  maxPassengers: 5,
  summary: '',
  budget: 2000,
  description: '',
  images: '',
  countries: [''],
  passengers: [0],
};

const Trips = () => {
  // change any type, cheater !! :D
  const [trips, setTrips] = useState<any>(tripsInitialValue);
  useEffect(() => {
    const getTripsData = async () => {
      const response = await fetch('http://localhost:5500/api/trips');
      const data = await response.json();
      const trip = await data.data;
      setTrips(trip);
      // console.log(data.data.map((ids) => ids.id));
    };
    getTripsData();
  }, []);

  console.log(trips.id);
  console.log(trips[0]);


  return (
    <section className="trips">
      <h1 className="trips__title">Dream trips list:</h1>
      <div className="trips__list">
        {trips.map((trip:TripsInterface) => (
          <TripCard
            id={trip.id}
            authorId={trip.authorId}
            authorAge={trip.authorAge}
            authorGender={trip.authorGender}
            from={trip.from}
            to={trip.to}
            maxPassengers={trip.maxPassengers}
            summary={trip.summary}
            budget={trip.budget}
            description={trip.description}
            images={trip.images}
            countries={trip.countries}
            passengers={trip.passengers}
          />
        ))}
      </div>
    </section>
  );
};

export default Trips;
