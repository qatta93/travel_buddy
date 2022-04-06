import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import countriesData from '../TripMap/countries.json';
import './style.css';

type ICountryData = typeof countriesData[0];

interface TripMapMarkerProps {
  country: ICountryData,
}

const TripMapMarker = ({ country }: TripMapMarkerProps) => {
  const [latitude, longitude] = country.latlng;
  const [popupShown, setPopupShown] = useState(false);

  return (
    <>
      <Marker
        longitude={longitude}
        latitude={latitude}
        onClick={() => setPopupShown(true)}
      />
      {popupShown && (
        <Popup
          longitude={longitude}
          latitude={latitude}
          closeOnClick={false}
          onClose={() => setPopupShown(false)}
        >
          <h1 className="trip-popup__title">{country.name}</h1>
          {country.capital && (
            <p className="trip-popup__info">
              capital:
              {' '}
              {country.capital}
            </p>
          )}
          <p className="trip-popup__info">
            code:
            {' '}
            {country.country_code}
          </p>
        </Popup>
      )}
    </>
  );
};

export default TripMapMarker;
