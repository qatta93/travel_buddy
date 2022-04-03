import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../helpers/api';
import { ITrip } from '../../types';
import MainHeader from '../MainHeader';
import UserCard from './UserCard';
import CloseIcon from '../Header/CloseIcon';
import { parseGenderRestrictions } from '../../helpers/misc';
import './style.css';

interface CreateInput {
  description: string,
}

const InitialInput = {
  description: '',
};

const Trip = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const [createInput, setCreateInput] = useState<CreateInput>(InitialInput);
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

  const createNewRequest = async () => {
    const newRequest = {
      // uuid?
      id: 5,
      trip_id: id,
      // based on google auth
      user_id: 1,
      status: 'pending',
      message: 'i am a test i am a test',
      sent_on: '2022-08-52T00:00:00.000Z',
      sentOn: '2022-08-52T00:00:00.000Z',
      tripId: 138,
      userId: 1,
      username: 'qatta',
      name: 'Patrycja',
      email: 'panasiuk.patrycja@gmail.com',
      user: {
        id: 1,
        name: 'Patrycja',
        username: 'qatta',
        email: 'panasiuk.patrycja@gmail.com',
      },
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    };
    console.log(newRequest);
    await fetch('http://localhost:5500/api/requests', requestOptions);
  };

  // let popup = 'false';

  // const openPopUp = (pop:string) => {
  //   if (pop === 'true') {
  //     pop = 'false';
  //     console.log(pop);
  //     return pop;
  //   }
  //   pop = 'true';
  //   console.log(pop);
  //   return pop;
  // };

  // console.log(popup);

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreateInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className="trip">
      {/* <section className={popup === 'true' ? 'trip__popup' : 'trip__popup--hide'}> */}
      <section className="trip__popup">
        <div className="trip__popup-wrapper">
          <form className="create-form" onSubmit={() => createNewRequest()}>
            <button type="button" className="trip__popup__close">
              <CloseIcon />
            </button>
            <h1 className="trip__popup__title">Why do you wanna join?</h1>
            <label htmlFor="summary">
              <textarea
                name="description"
                placeholder="Tell me more..."
                value={createInput.description}
                onChange={handleChangeTextArea}
                className="trip__popup__text"
              />
            </label>
            <button type="submit" className="trip__popup__btn">SEND</button>
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
              <div className="trip__dates">
                <p>{trip.from.slice(0, 10)}</p>
                <p className="trip__dates-dash">-</p>
                <p>{trip.to.slice(0, 10)}</p>
              </div>
              <p className="trip__description">{trip.description}</p>
            </section>
            <section className="trip__other">
              <p>
                {trip.maxPassengers - trip.passengers.length}
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
              <button
                className="trip__request-button"
                type="button"
                // onClick={() => openPopUp(popup)}
              >
                Send request!
              </button>
            </section>
          </>
        ) : <p>Loading...</p>}
      </section>
    </main>
  );
};

export default Trip;
