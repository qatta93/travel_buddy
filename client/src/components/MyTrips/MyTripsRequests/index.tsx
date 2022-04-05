import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../../helpers/api';
import MainHeader from '../../MainHeader';
import { IRequest } from '../../../types';
import MyTripRequestsCard from '../MyTripsRequestsCard';
import './style.css';

const MyTripRequests = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  const tripId = Number(window.location.pathname.match(/[0-9]*$/g)![0]);

  useEffect(() => {
    const getRequestsData = async () => {
      const data = await fetchApi<IRequest[]>('/api/requests/');
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setRequests(data.data);
    };
    getRequestsData();
  }, []);

  const tripRequests = requests.filter((req) => req.tripId === tripId);

  return (
    <section className="my-trips-requests">
      <MainHeader
        title="My trip requests"
        links={[
          { name: 'home', href: '/' },
          { name: 'profile', href: '/profile' },
          { name: 'my-trips', href: '/profile/my-trips' },
          { name: 'requests', href: `/profile/my-trips/${tripId}` },
        ]}
      />

      {tripRequests.length === 0
        ? (
          <div className="my-trips-requests__wrapper">
            <p className="my-trips__no-requests">No requests yet. Do not worry!</p>
            <p className="my-trips__no-requests">They will come soon ☺</p>
          </div>
        )
        : null}
      {tripRequests.map((request:IRequest) => (
        <div className="my-trips-requests__wrapper" key={request.id}>
          <MyTripRequestsCard request={request} setRequests={setRequests} />
        </div>
      ))}
    </section>
  );
};

export default MyTripRequests;
