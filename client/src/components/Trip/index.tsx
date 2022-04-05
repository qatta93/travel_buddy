import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../helpers/api';
import { ITrip } from '../../types';
import { useAppSelector } from '../../hooks';
import MainHeader from '../MainHeader';
import UserCard from './UserCard';
import CloseIcon from '../Header/CloseIcon';
import { parseGenderRestrictions, formatDatesTrip } from '../../helpers/misc';
import './style.css';

interface CreateInput {
  description: string,
}

const InitialInput = {
  description: '',
};

const Trip = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const [textInput, setTextInput] = useState<CreateInput>(InitialInput);
  const [popup, setPopup] = useState<string>('false');
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

  const createNewRequest = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    setTextInput(InitialInput);
    const newRequest = {
      tripId: id,
      userId: user.id,
      message: textInput.description,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    };

    await fetchApi('/api/requests', requestOptions);
  };

  const togglePopUp = () => {
    if (popup === 'true') {
      return setPopup('false');
    }
    return setPopup('true');
  };

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

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

  return (
    <main className="trip">
      <section className={popup === 'true' ? 'trip__popup' : 'trip__popup--hide'}>
        <div className="trip__popup-wrapper">
          <form className="create-form" onSubmit={createNewRequest}>
            <button type="button" className="trip__popup__close" onClick={() => togglePopUp()}>
              <CloseIcon />
            </button>
            <h1 className="trip__popup__title">Why do you wanna join?</h1>
            <label htmlFor="summary">
              <textarea
                name="description"
                placeholder="Tell me more..."
                value={textInput.description}
                onChange={handleChangeTextArea}
                className="trip__popup__text"
              />
            </label>
            <button type="submit" className="trip__popup__btn" onClick={() => togglePopUp()}>SEND</button>
          </form>
        </div>
      </section>
      <section className="trip-container">
        {trip ? (
          <>
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
            <section className="trip__img-container">
              <img src={trip.images || '/images/rockies.jpeg'} alt="trip" className="trip__img" />
            </section>
            <section className="trip__user-card">
              <UserCard id={trip.author.id} />
            </section>
            <section className="trip__button-container">
              {requestButtonActive ? (
                <button
                  className="trip__request-button"
                  type="button"
                  onClick={() => togglePopUp()}
                >
                  Send request!
                </button>
              ) : <p className="trip__request-button--disabled">{requestButtonMessage()}</p>}
            </section>
          </>
        ) : <p>Loading...</p>}
      </section>
    </main>
  );
};

export default Trip;
