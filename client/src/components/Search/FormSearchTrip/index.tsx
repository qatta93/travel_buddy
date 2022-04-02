import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../../helpers/api';
import { SearchFilters, ICountry } from '../../../types';
import './style.css';

interface Gender {
  male: boolean,
  female: boolean,
  other: boolean,
}

interface SearchInput {
  countries: string[],
  dateFrom: string,
  dateTo: string,
  ageFrom: string,
  ageTo: string,
  budget: string,
  gender: Gender,
}

const searchInputInitialValue = {
  countries: ['All'],
  dateFrom: '',
  dateTo: '',
  ageFrom: '',
  ageTo: '',
  budget: '',
  gender: {
    male: false,
    female: false,
    other: false,
  },
};

interface FormProps {
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>,
}

const countriesInitialValue = [
  {
    id: 999, country: 'All', code: 'ALL', country_code: 'ALL',
  },
];

const FormSearchTrip = ({ setFilters }: FormProps) => {
  const [searchInput, setSearchInput] = useState<SearchInput>(searchInputInitialValue);
  const [countries, setCountries] = useState<ICountry[]>(countriesInitialValue);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetchApi<ICountry[]>('/api/countries');
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setCountries((currentState) => currentState.concat(data.data));
    };

    fetchCountries();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilters((currentState) => ({
      ...currentState,
      countries: searchInput.countries,
      ageFrom: Number(searchInput.ageFrom),
      ageTo: Number(searchInput.ageTo),
      dateFrom: searchInput.dateFrom || undefined,
      dateTo: searchInput.dateTo || undefined,
      budget: Number(searchInput.budget),
      gender: searchInput.gender,
    }));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchInput((currentState) => ({
      ...currentState,
      countries: Array.from(event.target.selectedOptions, (option) => option.value),
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput((currentState) => ({
      ...currentState,
      gender: {
        ...currentState.gender,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  return (
    <section className="search-form-wrapper">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="country" className="search-form__label">
          Country:
          <select
            name="countries"
            value={searchInput.countries}
            onChange={handleChangeSelect}
            className="search-form__select"
            multiple
          >
            {countries.map((country) => (
              <option key={country.id} value={country.country}>{country.country}</option>
            ))}
          </select>
        </label>
        <label htmlFor="date" className="search-form__label search-form__label--date">
          Date:
          <input
            name="dateFrom"
            type="date"
            placeholder="From.."
            value={searchInput.dateFrom}
            onChange={handleChangeInput}
            className="search-form__input"
          />
          <span />
          <input
            name="dateTo"
            type="date"
            placeholder="To.."
            value={searchInput.dateTo}
            onChange={handleChangeInput}
            className="search-form__input"
          />
        </label>
        <label htmlFor="age" className="search-form__label search-form__label--age">
          Age:
          <input
            name="ageFrom"
            type="number"
            value={searchInput.ageFrom}
            onChange={handleChangeInput}
            placeholder="From.."
            className="search-form__input"
          />
          <input
            name="ageTo"
            type="number"
            value={searchInput.ageTo}
            onChange={handleChangeInput}
            placeholder="To.."
            className="search-form__input"
          />
        </label>
        <label htmlFor="budget" className="search-form__label">
          Budget:
          <input
            name="budget"
            type="number"
            placeholder="My max. budget is.. [USD]"
            value={searchInput.budget}
            onChange={handleChangeInput}
            className="search-form__input"
          />
        </label>
        <label htmlFor="gender" className="search-form__label search-form__label--checkbox">
          Gender:
          <input
            name="female"
            type="checkbox"
            className="search-form__checkbox"
            checked={searchInput.gender.female}
            onChange={handleChangeCheckbox}
          />
          F
          <input
            name="male"
            type="checkbox"
            className="search-form__checkbox"
            checked={searchInput.gender.male}
            onChange={handleChangeCheckbox}
          />
          M
          <input
            name="other"
            type="checkbox"
            className="search-form__checkbox"
            checked={searchInput.gender.other}
            onChange={handleChangeCheckbox}
          />
          Other
        </label>
        <button type="submit" className="search-form__btn">Filter trips</button>
      </form>
    </section>
  );
};

export default FormSearchTrip;
