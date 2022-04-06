import React, { useState } from 'react';
import Map, { Marker, FullscreenControl } from 'react-map-gl';
import countriesData from './countries.json';
import './style.css';
import { ICountry } from '../../../types';

const accessToken = 'pk.eyJ1IjoicWF0dGEiLCJhIjoiY2wxbTcyMHM1MGh2YjNwbzZqd2R6cXA5dSJ9.hwu5QNqh4Cvw1SBPVC8Rfw';

interface TripMapProps {
  countries: ICountry[],
}

const TripMap = ({ countries }: TripMapProps) => {
  const tripCountries = countries.map((c: ICountry) => c.country);
  const mapCountries = countriesData.filter((c) => tripCountries.includes(c.name));
  const country1 = mapCountries[0];
  const [longitude] = useState<number>(country1.latlng[1]);
  const [latitude] = useState<number>(country1.latlng[0]);
  const [zoom] = useState(1);

  return (
    <Map
      initialViewState={{
        longitude,
        latitude,
        zoom,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={accessToken}
    >
      <FullscreenControl />
      <Marker longitude={longitude} latitude={latitude} />
    </Map>
  );
};

export default TripMap;
