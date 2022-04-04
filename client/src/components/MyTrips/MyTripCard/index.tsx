import React, { useState } from 'react';
import { fetchApi } from '../../../helpers/api';
import { IRequest } from '../../../types';
import './style.css';

interface RequestCardProps {
  request: IRequest;
}

const MyTripCard = ({ request }:RequestCardProps) => {
  const [status, setStatus] = useState<string>(request.status);

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
      await fetchApi(`http://localhost:5500/api/requests/${requestId}`, requestOptions);
      setStatus('accepted');
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
      await fetchApi(`http://localhost:5500/api/requests/${requestId}`, requestOptions);
      setStatus('rejected');
    };
    putStatusData();
  };

  const sentOnYear = request.sentOn.split(/T.+/g)[0].split('-')[0].split(/^.{2}/)[1];
  const sentOnMonth = request.sentOn.split(/T.+/g)[0].split('-')[1];
  const sentOnDay = request.sentOn.split(/T.+/g)[0].split('-')[2];
  const sentOnDate = `${sentOnDay}-${sentOnMonth}-${sentOnYear}`;

  return (
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
        {status === 'accepted'
          ? (
            <>
              <button type="button" className="request-card__button request-card__button--accepted">accepted</button>
              <button type="button" className="request-card__button request-card__button--change" onClick={() => rejectRequest()}>reject</button>
            </>
          )
          : ''}
        {status === 'rejected'
          ? (
            <>
              <button type="button" className="request-card__button request-card__button--rejected">rejected</button>
              <button type="button" className="request-card__button request-card__button--change" onClick={() => acceptRequest()}>accept</button>
            </>
          )
          : ''}
      </div>
    </article>
  );
};

export default MyTripCard;
