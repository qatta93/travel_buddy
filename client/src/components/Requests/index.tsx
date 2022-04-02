import React, { useEffect } from 'react';
import MainHeader from '../MainHeader';
import { fetchApi } from '../../helpers/api';
import RequestCard from './RequestCard';
import { IRequest } from '../../types';
import './style.css';

const Requests = () => {
// const [requests, setRequests] = useState<IRequest[]>([]);

  useEffect(() => {
    const getRequestsData = async () => {
      const data = await fetchApi<IRequest[]>('/api/requests');
      console.log(data);
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
      <RequestCard />
    </section>
  );
};

export default Requests;
