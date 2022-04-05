import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore: Unreachable code error
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import mapData from './map.json';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicWF0dGEiLCJhIjoiY2wxbTcyMHM1MGh2YjNwbzZqd2R6cXA5dSJ9.hwu5QNqh4Cvw1SBPVC8Rfw';

const Maps = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(2);

  console.log(setLng);
  console.log(setLat);
  console.log(setZoom);

  const countries = mapData.filter((c) => c.CountryName === 'Canada')[0];
  console.log(countries);

  useEffect(() => {
    const createMap = async () => {
      if (map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom,
      });

      const marker = new mapboxgl.Marker().setLngLat([
        countries.CapitalLongitude, countries.CapitalLatitude,
      ]).addTo(map.current);
      console.log(marker);
    };

    createMap();
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Maps;
