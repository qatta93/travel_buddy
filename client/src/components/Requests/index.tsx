import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import MainHeader from '../MainHeader';
import { fetchApi } from '../../helpers/api';
import RequestCard from './RequestCard';
import { IRequest } from '../../types';
import './style.css';

const Requests = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id;
  const filterRequestsByUserId = requests.filter((req) => req.user.id === userId);
  const isPendingStatus = filterRequestsByUserId.some((req) => req.status === 'pending');
  const isAcceptedRejected = filterRequestsByUserId.some((req) => req.status === 'accepted' || 'rejected');

  useEffect(() => {
    const getRequestsData = async () => {
      const data = await fetchApi<IRequest[]>('/api/requests');
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      const request = await data.data;
      setRequests(request);
    };
    getRequestsData();
  }, []);

  return (
    <section className="requests">
      <MainHeader
        title="Requests"
        links={[
          { name: 'home', href: '/' },
          { name: 'requests', href: '/requests' },
        ]}
      />
      <div className="request__list">
        <h1 className="requests__title">Pending requests:</h1>
        {isPendingStatus === false ? <p className="request__status">No pending requests</p> : null}
        {filterRequestsByUserId.map((request:IRequest) => (
          <RequestCard key={request.id} request={request} />
        ))}
        {'\n'}
        <h1 className="requests__title">Accepted / rejected requests:</h1>
        {isAcceptedRejected === false ? <p className="request__status">No requests</p> : null}

      </div>
      <img className="requests__img" src="/images/bg_desktop.png" alt="car" />

    </section>
  );
};

export default Requests;
