import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader';
import TripCard from '../TripCard';
import { fetchApi } from '../../helpers/api';
import { ITrip } from '../../types';
import './style.css';
import { useAppSelector } from '../../hooks';

const MyTrips = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);

  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id;

  const filterTripsByUserId = trips.filter((req) => req.author.id === userId);

  useEffect(() => {
    let valid = true;

    const getTripsData = async () => {
      const data = await fetchApi<ITrip[]>('/api/trips');

      if (!valid) {
        return;
      }

      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      const trip = await data.data;
      setTrips(trip);
    };

    getTripsData();

    return () => { valid = false; };
  }, []);

  return (
    <section className="my-trips">
      <MainHeader
        title="My trip"
        links={[
          { name: 'home', href: '/' },
          { name: 'profile', href: '/profile' },
          { name: 'my-trips', href: '/profile/my-trips' },
        ]}
      />
      <div className="my-trips__list">
        {filterTripsByUserId.length === 0 ? <p className="my-trips__list--empty">You have no upcoming trips!</p> : null}
        {filterTripsByUserId.map((trip:ITrip) => (
          <Link key={trip.id} to={`/profile/my-trips/${trip.id}`} className="my-trips__item">
            <TripCard trip={trip} />
          </Link>
        ))}
      </div>
      <img className="my-trips__img" src="/images/bg_desktop.png" alt="car" />

    </section>
  );
};

export default MyTrips;
