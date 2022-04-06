import React, { useState, useEffect } from 'react';
import FormSearchTrip from './FormSearchTrip';
import Trips from '../Trips';
import { fetchApi } from '../../helpers/api';
import MainHeader from '../MainHeader';
import { ITrip, SearchFilters } from '../../types';
import { filterTripSearch } from '../../helpers/search';
import './style.css';

const filtersInitialValue = {
  countries: ['All'],
  ageFrom: 0,
  ageTo: 0,
  dateFrom: undefined,
  dateTo: undefined,
  budget: 0,
  gender: {
    male: false,
    female: false,
    other: false,
  },
};

const Search = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(filtersInitialValue);

  useEffect(() => {
    let valid = true;
    const getTripsData = async () => {
      const data = await fetchApi<ITrip[]>('/api/trips');

      if (!valid) {
        return;
      }

      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      const trip = await data.data;
      setTrips(trip);
    };

    getTripsData();

    return () => { valid = false; };
  }, []);

  const filteredTrips = filterTripSearch(trips, filters);

  return (
    <main className="search">
      <MainHeader
        title="Find your perfect trip !"
        links={[
          { name: 'home', href: '/' },
          { name: 'trips', href: '/trips' },
        ]}
      />
      <section className="search__form">
        <FormSearchTrip setFilters={setFilters} />
        {filteredTrips.length > 0 ? (
          <Trips trips={filteredTrips} title="Dream trip list" />
        ) : <p className="search__message">No trips matched your search</p>}
      </section>
      <div className="search__car-bcg" />
    </main>
  );
};

export default Search;
