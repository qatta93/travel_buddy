import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore: Unreachable code error
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import mapData from './map.json';
import './style.css';
import { ICountry } from '../../../types';

mapboxgl.accessToken = 'pk.eyJ1IjoicWF0dGEiLCJhIjoiY2wxbTcyMHM1MGh2YjNwbzZqd2R6cXA5dSJ9.hwu5QNqh4Cvw1SBPVC8Rfw';

// @ts-ignore: Unreachable code error
const Maps = ({ countries }:ICountry[]) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [zoom, setZoom] = useState(2);

  console.log(setZoom);

  const tripCountries = countries.map((c:any) => c.country);
  const mapCountries = mapData.filter((c) => c.CountryName === tripCountries[0])[0];

  useEffect(() => {
    setLng(Number(mapCountries.CapitalLongitude));
    setLat(Number(mapCountries.CapitalLatitude));
    const createMap = async () => {
      if (map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom,
      });

      const marker = new mapboxgl.Marker().setLngLat([
        lng, lat,
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
