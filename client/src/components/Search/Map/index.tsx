import React from 'react';
import Map from 'react-map-gl';
import { ITrip } from '../../../types';
import './style.css';

interface MapsProps {
  trips: ITrip[],
}

const accessToken = 'pk.eyJ1IjoidG9tODQiLCJhIjoiY2wxMXdqd2t4MDEzbTNjbXZ3eW81c2sxYiJ9.P0aH-Hn9LJ0dcCOPcAvmwQ';

const Maps = ({ trips }:MapsProps) => {
  console.log(trips);

  return (
    <section className="trips__map-container">
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        mapboxAccessToken={accessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    </section>
  );
};

export default Maps;
