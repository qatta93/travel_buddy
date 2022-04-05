import React, { useState } from 'react';
import ChevronIcon from '../ChevronIcon';
import UserCard from '../UserCard';
import './style.css';

interface PassengersProps {
  passengers: string[];
}

const Passengers = ({ passengers }: PassengersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => setIsExpanded((currentState) => !currentState);

  return (
    <article className="passengers">
      <div className="passengers__header">
        <button type="button" onClick={handleClick} className="passengers__button">
          <span className="passengers__button-text">See other passengers</span>
          <ChevronIcon isExpanded={isExpanded} />
        </button>
      </div>
      <div className={`passengers__container ${isExpanded ? 'passengers__container--visible' : ''}`}>
        {passengers.map((p) => <UserCard key={p} id={Number(p)} />)}
      </div>
    </article>
  );
};

export default Passengers;
