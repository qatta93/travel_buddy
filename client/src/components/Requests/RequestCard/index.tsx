import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../../helpers/api';
import { IRequest, ITrip } from '../../../types';
import './style.css';

interface RequestCardProps {
  request: IRequest;
}

const RequestCard = ({ request }:RequestCardProps) => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const [cancelled, setCancelled] = useState(false);

  const { tripId } = request;
  const { status } = request;

  const dateFromMonth = trip?.from.split(/T.+/g)[0].split(/^.{5}/)[1].split('-')[0];
  const dateFromDay = trip?.from.split(/T.+/g)[0].split(/^.{5}/)[1].split('-')[1];
  const dateFrom = `${dateFromDay}.${dateFromMonth}`;

  const dateToYear = trip?.to.split(/T.+/g)[0].split('-')[0].split(/^.{2}/)[1];
  const dateToMonth = trip?.to.split(/T.+/g)[0].split('-')[1];
  const dateToDay = trip?.to.split(/T.+/g)[0].split('-')[2];
  const dateTo = `${dateToDay}.${dateToMonth}.${dateToYear}`;

  useEffect(() => {
    const fetchTrip = async () => {
      const data = await fetchApi<ITrip>(`/api/trips/${tripId}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setTrip(data.data);
    };

    fetchTrip();
  }, []);

  const cancelRequest = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetchApi(`/api/requests/${request.id}`, requestOptions);
    setCancelled(true);
  };

  const tripCountries = trip?.countries.map((countriesArr) => countriesArr.country).join(' | ');
  const tripDate = `  ${dateFrom} - ${dateTo}`;
  const tripHostName = trip?.author.username;

  return (
    <article className={`request-card--user request-card__cancel--${cancelled} request-card--${status}`}>
      <header className={`request-card__header request-card__header--${status}`}>
        <div className="request-card__wrapper">
          <h1 className="request-card__title">
            {tripCountries}
            {', '}
            {tripDate}
          </h1>
          {status === 'accepted' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 request-card__cancel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={() => cancelRequest()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          )
            : null}
          {status === 'pending' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 request-card__cancel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={() => cancelRequest()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          )
            : null}
          {status === 'rejected' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 request-card__delete" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={() => cancelRequest()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )
            : null}
        </div>
        <p className="request-card__name">{tripHostName}</p>
      </header>
      <div className="request-card__buttons">
        {status === 'pending'
          ? <button type="button" className="request-card__button request-card__button--pending">pending</button>
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
