import React from 'react';
import { ITrip } from '../../../types';
import countryData from '../../Trip/TripMap/countries.json';
import MarkerT from '../MarkerT';
import './style.css';

interface MapProps {
  trip: ITrip,
}

const MapMarker = ({ trip }:MapProps) => {
  const { countries } = trip;
  const countriesNames = countries.map((c) => c.country);
  const countriesData = countryData.filter((c) => countriesNames.includes(c.name));
  console.log(trip);
  console.log(countriesNames[0]);
  return (
    <>
      {countriesData.map((c) => (
        <MarkerT key={c.country_code} country={c}>
          <div className="trips-popup">
            <img src={trip.images || '/images/trip-default.jpg'} alt="trip" className="trips-popup__img" />
            <div className="trips-popup__info">
              <h1 className="trips-popup__title">{`Trip to ${countriesNames}`}</h1>
              <p className="trips-popup__text">{`You will be travelling with ${trip.author.username}`}</p>
              <a href={`/trips/${trip.id}`} className="trips-popup__link">Trip details</a>
            </div>
          </div>
        </MarkerT>
      ))}
    </>
  );
};

export default MapMarker;
