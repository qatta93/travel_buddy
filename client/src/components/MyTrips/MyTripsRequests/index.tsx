import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../../helpers/api';
import MainHeader from '../../MainHeader';
import { IRequest } from '../../../types';
import './style.css';

// interface RequestCardProps {
//   request: IRequest;
// }

const MyTripRequests = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  console.log('I am here');

  useEffect(() => {
    const getRequestsData = async () => {
      console.log('fetching reqs');
      const data = await fetchApi<IRequest[]>('/api/requests');
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      console.log(data);
      setRequests(data.data);
    };

    getRequestsData();
  }, []);

  const request = requests[0];

  const acceptRequest = () => {
    const requestId = request.id;
    const putStatusData = async () => {
      const newRequest = {
        ...request,
        status: 'accepted',
      };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      };
      await fetchApi(`/api/requests/${requestId}`, requestOptions);
      // setStatus('accepted');
    };
    putStatusData();
  };

  const rejectRequest = () => {
    const requestId = request.id;
    const putStatusData = async () => {
      const newRequest = {
        ...request,
        status: 'rejected',
      };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      };
      await fetchApi(`/api/requests/${requestId}`, requestOptions);
      // setStatus('rejected');
    };
    putStatusData();
  };

  const sentOnYear = request?.sentOn.split(/T.+/g)[0].split('-')[0].split(/^.{2}/)[1];
  const sentOnMonth = request?.sentOn.split(/T.+/g)[0].split('-')[1];
  const sentOnDay = request?.sentOn.split(/T.+/g)[0].split('-')[2];
  const sentOnDate = `${sentOnDay}-${sentOnMonth}-${sentOnYear}`;

  const status = 'pending';

  return request ? (
    <section className="my-trips">
      {/* change my trips id! */}
      <MainHeader
        title="My trip requests"
        links={[
          { name: 'home', href: '/' },
          { name: 'profile', href: '/profile' },
          { name: 'my-trips', href: '/my-trips' },
          { name: 'requests', href: '/my-trips/252' },
        ]}
      />
      <article className={`request-card request-card--${status}`}>
        <header className={`request-card__header request-card__header--${status}`}>
          <h1 className="request-card__title">
            {request.user.name}
            {', '}
            {sentOnDate}
          </h1>
          <p className="request-card__email">{request.user.email}</p>
        </header>
        <p className="request-card__text">{request.message}</p>
        <div className="request-card__buttons">
          {status === 'pending'
            ? (
              <>
                <button type="button" className="request-card__button request-card__button--accept" onClick={() => acceptRequest()}>accept</button>
                <button type="button" className="request-card__button request-card__button--reject" onClick={() => rejectRequest()}>reject</button>
              </>
            )
            : ''}
          {status === 'pending'
            ? (
              <>
                <button type="button" className="request-card__button request-card__button--accepted">accepted</button>
                <button type="button" className="request-card__button request-card__button--change" onClick={() => rejectRequest()}>reject</button>
              </>
            )
            : ''}
          {status === 'pending'
            ? (
              <>
                <button type="button" className="request-card__button request-card__button--rejected">rejected</button>
                <button type="button" className="request-card__button request-card__button--change" onClick={() => acceptRequest()}>accept</button>
              </>
            )
            : ''}
        </div>
      </article>
    </section>
  ) : null;
};

export default MyTripRequests;
