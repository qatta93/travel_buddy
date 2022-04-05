import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../../helpers/api';
import MainHeader from '../../MainHeader';
import { IRequest } from '../../../types';
import './style.css';

type Status = 'pending' | 'accepted' | 'rejected' | 'cancelled';

const updateRequestStatus = (reqs:IRequest[], id:number, status:Status):IRequest[] => reqs
  .map((req) => {
    if (req.id !== id) {
      return req;
    }
    return {
      ...req,
      status,
    };
  });

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

  const request = requests.filter((req) => req.tripId === tripId)[0];

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
      const newRequests = updateRequestStatus(requests, requestId, 'accepted');
      setRequests(newRequests);
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
      const newRequests = updateRequestStatus(requests, requestId, 'rejected');
      setRequests(newRequests);
    };
    putStatusData();
  };

  const sentOnYear = request?.sentOn.split(/T.+/g)[0].split('-')[0].split(/^.{2}/)[1];
  const sentOnMonth = request?.sentOn.split(/T.+/g)[0].split('-')[1];
  const sentOnDay = request?.sentOn.split(/T.+/g)[0].split('-')[2];
  const sentOnDate = `${sentOnDay}-${sentOnMonth}-${sentOnYear}`;

  return request ? (
    <section className="my-trips">
      <MainHeader
        title="My trip requests"
        links={[
          { name: 'home', href: '/' },
          { name: 'profile', href: '/profile' },
          { name: 'my-trips', href: 'profile/my-trips' },
          { name: 'requests', href: `profile/my-trips/${tripId}` },
        ]}
      />
      <article className={`request-card request-card--${request.status}`}>
        <header className={`request-card__header request-card__header--${request.status}`}>
          <h1 className="request-card__title">
            {request.user.name}
            {', '}
            {sentOnDate}
          </h1>
          <p className="request-card__email">{request.user.email}</p>
        </header>
        <p className="request-card__text">{request.message}</p>
        <div className="request-card__buttons">
          {request.status === 'pending'
            ? (
              <>
                <button type="button" className="request-card__button request-card__button--accept" onClick={() => acceptRequest()}>accept</button>
                <button type="button" className="request-card__button request-card__button--reject" onClick={() => rejectRequest()}>reject</button>
              </>
            )
            : ''}
          {request.status === 'accepted'
            ? (
              <>
                <button type="button" className="request-card__button request-card__button--accepted">accepted</button>
                <button type="button" className="request-card__button request-card__button--change" onClick={() => rejectRequest()}>reject</button>
              </>
            )
            : ''}
          {request.status === 'rejected'
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
