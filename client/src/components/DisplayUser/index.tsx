import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IUser, ITrip } from '../../types';
import { fetchApi } from '../../helpers/api';
import MainHeader from '../MainHeader';
import DisplayCard from './DisplayCard';
import Trips from '../Trips';
import './style.css';

export const DisplayUser = () => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const [userTrips, setUserTrips] = useState<ITrip[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getUserDetailsAndTrips = async () => {
      const [userDetailsData, tripsData] = await Promise.all([
        fetchApi<IUser>(`/api/users/${id}`),
        fetchApi<ITrip[]>('/api/trips'),
      ]);

      if (tripsData.status === 'success') {
        const userTripsData = tripsData.data.filter((t) => t.author.id === Number(id));
        setUserTrips(userTripsData);
      }

      if (userDetailsData.status === 'success') {
        setUserDetails(userDetailsData.data);
      }

      if (userDetailsData.status === 'error') {
        console.log(userDetailsData.message);
      }

      if (tripsData.status === 'error') {
        console.log(tripsData.message);
      }
    };

    getUserDetailsAndTrips();
  }, []);

  return (
    <main className="display-user">
      <MainHeader
        title={(userDetails && userDetails.username.length > 0 ? `${userDetails.username}` : 'New User')}
        links={[
          { name: 'home', href: '/' },
          { name: 'users', href: '/users' },
          { name: 'details', href: `/api/users/${id}` },
        ]}
      />
      {userDetails && (
        <section className="display-card">
          <DisplayCard user={userDetails} />
        </section>
      )}
      {userTrips.length > 0 && (
        <section className="display-user__trips">
          <Trips trips={userTrips} />
        </section>
      )}
      <img className="display-user__img" src="/images/bg_desktop.png" alt="car" />
    </main>
  );
};
