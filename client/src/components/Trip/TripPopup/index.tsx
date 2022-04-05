import React, { useState } from 'react';
import CloseIcon from '../../Header/CloseIcon';
import { LoggedInUser } from '../../../types';
import { fetchApi } from '../../../helpers/api';
import './style.css';

interface TripPopupProps {
  togglePopup: () => void,
  user: LoggedInUser,
  tripId: string | undefined,
}

const TripPopup = ({ togglePopup, user, tripId }: TripPopupProps) => {
  const [input, setInput] = useState<string>('');

  const createNewRequest = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const newRequest = {
      tripId,
      userId: user.id,
      message: input,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    };

    await fetchApi('/api/requests', requestOptions);
    setInput('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="trip-popup">
      <form className="create-form" onSubmit={createNewRequest}>
        <button type="button" className="trip-popup__close" onClick={togglePopup}>
          <CloseIcon />
        </button>
        <h1 className="trip-popup__title">Why do you wanna join?</h1>
        <label htmlFor="message">
          <textarea
            name="message"
            placeholder="I really want to join..."
            value={input}
            onChange={handleChange}
            className="trip-popup__text"
          />
        </label>
        <button type="submit" className="trip-popup__btn" onClick={togglePopup}>SEND</button>
      </form>
    </div>
  );
};

export default TripPopup;
