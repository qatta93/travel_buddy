import React from 'react';
import MainHeader from '../MainHeader';
import RequestCard from './RequestCard';
import './style.css';

const Requests = () => (
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

export default Requests;
