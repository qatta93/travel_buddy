import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore: Unreachable code error
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

require('dotenv').config();

mapboxgl.accessToken = 'pk.eyJ1IjoicWF0dGEiLCJhIjoiY2wxbTcyMHM1MGh2YjNwbzZqd2R6cXA5dSJ9.hwu5QNqh4Cvw1SBPVC8Rfw';

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

console.log(setLng);
console.log(setLat);
console.log(setZoom);

const Maps = () => {

}