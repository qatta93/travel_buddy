import React, { useEffect, useState } from 'react';
import MainHeader from '../MainHeader';
import { fetchApi } from '../../helpers/api';
import RequestCard from './RequestCard';
import { IRequest } from '../../types';
import './style.css';

const Requests = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);

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
        {requests.map((request:IRequest) => (
          <RequestCard key={request.id} request={request} />
        ))}
        <img className="requests__img" src="/images/bg_desktop.png" alt="car" />
      </div>
    </section>
  );
};

export default Requests;
