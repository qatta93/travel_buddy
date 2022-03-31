import React, { useState } from 'react';
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

const Form = () => {
  const [searchInput, setSearchInput] = useState<SearchInput>(searchInputInitialValue);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    <section className="form-wrapper">
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
            <option value="All">All</option>
            <option value="Canada">Canada</option>
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

export default Form;
