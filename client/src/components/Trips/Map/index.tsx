import React from 'react';
import Map, { FullscreenControl, NavigationControl } from 'react-map-gl';
// import countriesData from './map.json';
import { ITrip } from '../../../types';
import MapMarker from '../MapMarker';
import './style.css';

interface MapsProps {
  trips: ITrip[],
}

const accessToken = 'pk.eyJ1IjoidG9tODQiLCJhIjoiY2wxMXdqd2t4MDEzbTNjbXZ3eW81c2sxYiJ9.P0aH-Hn9LJ0dcCOPcAvmwQ';

const Maps = ({ trips }:MapsProps) => (
  <section className="trips__map-container">
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 1,
      }}
      mapboxAccessToken={accessToken}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <FullscreenControl />
      <NavigationControl />
      {trips.map((t) => <MapMarker key={t.id} trip={t} />)}
    </Map>
  </section>
);

export default Maps;
