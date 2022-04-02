import React, { useState } from 'react';
import { IRequest } from '../../../types';
import './style.css';

interface RequestCardProps {
  request: IRequest;
}

const RequestCard = ({ request }:RequestCardProps) => {
  const [status, setStatus] = useState<string>('pending');

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
      await fetch(`http://localhost:5500/api/requests/${requestId}`, requestOptions);
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
      await fetch(`http://localhost:5500/api/requests/${requestId}`, requestOptions);
      setStatus('rejected');
    };
    putStatusData();
  };

  return (
    <article className={`request-card request-card--${status}`}>
      <header className={`request-card__header request-card__header--${status}`}>
        <h1 className="request-card__title">Thomas, 22.03</h1>
        <p className="request-card__email">fff@gmail.com</p>
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
            <button type="button" className="request-card__button request-card__button--accepted">accepted</button>
          )
          : ''}
        {status === 'rejected'
          ? (
            <button type="button" className="request-card__button request-card__button--rejected">rejected</button>
          )
          : ''}
      </div>
    </article>
  );
};

export default RequestCard;
