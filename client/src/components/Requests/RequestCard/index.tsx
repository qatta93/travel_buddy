import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../../helpers/api';
import { IRequest, ITrip } from '../../../types';
import './style.css';

interface RequestCardProps {
  request: IRequest;
}

const RequestCard = ({ request }:RequestCardProps) => {
  const [trip, setTrip] = useState<ITrip | null>(null);

  const { tripId } = request;
  const status = trip?.requests[0].status;

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

  const tripCountries = trip?.countries.map((countriesArr) => countriesArr.country).join(' | ');
  const tripDate = `  ${dateFrom} - ${dateTo}`;
  const tripHostName = trip?.author.username;

  return (
    <article className={`request-card request-card--${status}`}>
      <header className={`request-card__header request-card__header--${status}`}>
        <h1 className="request-card__title">
          {tripCountries}
          {', '}
          {tripDate}
        </h1>
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
