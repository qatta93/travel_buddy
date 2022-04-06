import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import countryData from '../../Trip/TripMap/countries.json';

type ICountryData = typeof countryData[0];

interface MarkerTProps {
  country: ICountryData;
  children: JSX.Element;
}

const MarkerT = ({ country, children }: MarkerTProps) => {
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
          {children}
        </Popup>
      )}
    </>
  );
};

export default MarkerT;
