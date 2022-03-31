import React, { useState, useEffect } from 'react';
import Form from './Form';
import Trips from './Trips';
import { fetchApi } from '../../helpers/api';
import MainHeader from '../MainHeader';
import { ITrip, SearchFilters } from '../../types';
import { filterTripSearch } from '../../helpers/misc';
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
    const getTripsData = async () => {
      const data = await fetchApi<ITrip[]>('/api/trips');
      if (data.status === 'error') {
        return;
      }
      const trip = await data.data;
      setTrips(trip);
    };

    getTripsData();
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
        <Form setFilters={setFilters} />
        {filteredTrips.length > 0 ? (
          <Trips trips={filteredTrips} />
        ) : <p className="search__message">No trips matched your search</p>}
      </section>

    </main>
  );
};

export default Search;
