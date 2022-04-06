import React, { useState } from 'react';
import Map, { FullscreenControl } from 'react-map-gl';
import countriesData from './countries.json';
import './style.css';
import { ICountry } from '../../../types';
import TripMapMarker from '../TripMapMarker';

const accessToken = 'pk.eyJ1IjoicWF0dGEiLCJhIjoiY2wxbTcyMHM1MGh2YjNwbzZqd2R6cXA5dSJ9.hwu5QNqh4Cvw1SBPVC8Rfw';

interface TripMapProps {
  countries: ICountry[],
}

const getAvrgLatLng = (countries: typeof countriesData) => {
  const latlng = countries.map((c) => c.latlng);

  const totalLat = latlng.map((c) => c[0]).reduce((sum, val) => sum + val, 0);
  const totalLng = latlng.map((c) => c[1]).reduce((sum, val) => sum + val, 0);

  return [totalLat / latlng.length, totalLng / latlng.length];
};

const TripMap = ({ countries }: TripMapProps) => {
  const tripCountries = countries.map((c: ICountry) => c.country);
  const mapCountries = countriesData.filter((c) => tripCountries.includes(c.name));

  console.log(mapCountries);

  const [avrgLat, avrgLng] = getAvrgLatLng(mapCountries);

  console.log(avrgLat, avrgLng);

  const [longitude] = useState<number>(avrgLng);
  const [latitude] = useState<number>(avrgLat);
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
      {mapCountries.map((c) => <TripMapMarker key={c.country_code} country={c} />)}
    </Map>
  );
};

export default TripMap;
