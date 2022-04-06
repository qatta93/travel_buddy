import React from 'react';
import Map, { FullscreenControl, NavigationControl } from 'react-map-gl';
import countriesData from './countries.json';
import { ICountry } from '../../../types';
import TripMapMarker from '../TripMapMarker';

const accessToken = 'pk.eyJ1IjoicWF0dGEiLCJhIjoiY2wxbTcyMHM1MGh2YjNwbzZqd2R6cXA5dSJ9.hwu5QNqh4Cvw1SBPVC8Rfw';

interface TripMapProps {
  countries: ICountry[],
}

const TripMap = ({ countries }: TripMapProps) => {
  const tripCountries = countries.map((c: ICountry) => c.country);
  const mapCountries = countriesData.filter((c) => tripCountries.includes(c.name));

  const [latitude, longitude] = mapCountries[0].latlng;

  return (
    <Map
      initialViewState={{
        longitude,
        latitude,
        zoom: 1,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={accessToken}
    >
      <NavigationControl />
      <FullscreenControl />
      {mapCountries.map((c) => <TripMapMarker key={c.country_code} country={c} />)}
    </Map>
  );
};

export default TripMap;
