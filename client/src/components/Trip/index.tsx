import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Link, useParams } from 'react-router-dom';
import { fetchApi } from '../../helpers/api';
import { ITrip } from '../../types';
import { useAppSelector } from '../../hooks';
import MainHeader from '../MainHeader';
import UserCard from './UserCard';
import { parseGenderRestrictions, formatDatesTrip } from '../../helpers/misc';
import TripPopup from './TripPopup';
import Passengers from './Passengers';
import TripMap from './TripMap';
import './style.css';

const Trip = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const data = await fetchApi<ITrip>(`/api/trips/${id}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setTrip(data.data);
    };

    fetchTrip();
  }, []);

  const togglePopup = () => setPopup((currentState) => !currentState);

  const seatsLeft = trip && Math.max(trip.maxPassengers - trip.requests.filter((r) => r.status === 'accepted').length, 0);

  const requestButtonActive = user && trip && trip.author.id !== user.id && seatsLeft;

  const tripDates = trip && formatDatesTrip(trip.from, trip.to);

  const requestButtonMessage = (): string => {
    if (!user) {
      return 'Login to send a request';
    }
    if (trip && trip.author.id === user.id) {
      return 'Your trip looks amazing!';
    }
    return 'This trip is full';
  };

  const passengers = trip ? trip.requests.filter((r) => r.status === 'accepted').map((r) => r.userId) : [];

  return (
    <main className="trip">
      <div className={`trip__popup ${!popup ? 'trip__popup--hide' : ''}`}>
        <TripPopup togglePopup={togglePopup} tripId={id} user={user} />
      </div>
      {trip && (
        <div className="trip__container">
          <section className="trip__main-header">
            <MainHeader
              title={`trip with ${trip.author.username} to ${trip.countries.map((c) => c.country).join(', ')}`}
              links={[
                { href: '/', name: 'Home' },
                { href: '/trips', name: 'Trips' },
                { href: `/trips/${id}`, name: 'Details' },
              ]}
            />
          </section>
          <section className="trip__summary">
            <p className="trip__summary-text">{`„ ${trip.summary} ”`}</p>
          </section>
          <section className="trip__info">
            <p className="trip__dates">{tripDates}</p>
            <p className="trip__description">{trip.description}</p>
          </section>
          <section className="trip__other">
            <p>
              {seatsLeft}
              {' '}
              seats left
            </p>
            <p>{parseGenderRestrictions(trip.genderRestrictions)}</p>
            {trip.budget && (
              <p>
                USD$
                {trip.budget}
              </p>
            )}
          </section>
          {trip.video && (
            <section className="trip__video-container">
              <YouTube videoId={trip.video} className="trip__video" />
            </section>
          )}
          <section className="trip__img-container">
            <img src={trip.images || '/images/rockies.jpeg'} alt="trip" className="trip__img" />
          </section>
          <section className="trip__user-card">
            <Link to={`/users/${trip.author.id}`}>
              <UserCard id={trip.author.id} />
            </Link>
          </section>
          {passengers.length > 0 && (
            <section className="trip__passengers">
              <Passengers passengers={passengers} />
            </section>
          )}
          <section className="trip__button-container">
            {requestButtonActive ? (
              <button
                className="trip__request-button"
                type="button"
                onClick={togglePopup}
              >
                Send request!
              </button>
            ) : <p className="trip__request-button--disabled">{requestButtonMessage()}</p>}
          </section>
          <section className="trip__map">
            <TripMap countries={trip.countries} />
          </section>
        </div>
      )}
    </main>
  );
};

export default Trip;
