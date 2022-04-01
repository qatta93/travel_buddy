import React, { useState, useEffect } from 'react';
import { ICountry, IActivity } from '../../../types';
import { fetchApi } from '../../../helpers/api';
import './style.css';

interface Gender {
  male: boolean,
  female: boolean,
  other: boolean,
}

interface CreateInput {
  countries: string[],
  dateFrom: string,
  dateTo: string,
  budget: string,
  gender: Gender,
  buddies: string,
  description: string,
  summary: string,
  images: string,
  places: string,
  activities: string[],
}

const createInputInitialValue = {
  countries: ['All'],
  dateFrom: '',
  dateTo: '',
  budget: '',
  gender: {
    male: false,
    female: false,
    other: false,
  },
  buddies: '',
  description: '',
  summary: '',
  images: '',
  places: '',
  activities: [],
};

const CreateTripForm = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [createInput, setCreateInput] = useState<CreateInput>(createInputInitialValue);

  useEffect(() => {
    const fetchCountriesAndActivities = async () => {
      const [countriesData, activitiesData] = await Promise.all([
        fetchApi<ICountry[]>('/api/countries'),
        fetchApi<IActivity[]>('/api/activities'),
      ]);
      if (countriesData.status === 'success') {
        setCountries(countriesData.data);
      }
      if (activitiesData.status === 'success') {
        setActivities(activitiesData.data);
      }
    };

    fetchCountriesAndActivities();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateInput((currentState) => ({
      ...currentState,
      [event.target.name]: Array.from(event.target.selectedOptions, (option) => option.value),
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateInput((currentState) => ({
      ...currentState,
      gender: {
        ...currentState.gender,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreateInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label htmlFor="country" className="create-form__label">
        Country:
        <select
          name="countries"
          value={createInput.countries}
          onChange={handleChangeSelect}
          className="create-form__select"
          multiple
        >
          {countries.map((country) => (
            <option key={country.id} value={country.country}>{country.country}</option>
          ))}
        </select>
      </label>
      <label htmlFor="date" className="create-form__label create-form__label--date">
        Date:
        <input
          name="dateFrom"
          type="date"
          placeholder="From.."
          value={createInput.dateFrom}
          onChange={handleChangeInput}
          className="create-form__input"
        />
        <span />
        <input
          name="dateTo"
          type="date"
          placeholder="To.."
          value={createInput.dateTo}
          onChange={handleChangeInput}
          className="create-form__input"
        />
      </label>
      <label htmlFor="budget" className="create-form__label">
        Budget:
        <input
          name="budget"
          type="number"
          placeholder="My max. budget is.. [USD]"
          value={createInput.budget}
          onChange={handleChangeInput}
          className="create-form__input"
        />
      </label>
      <label htmlFor="gender" className="create-form__label create-form__label--checkbox">
        Gender:
        <input
          name="female"
          type="checkbox"
          className="create-form__checkbox"
          checked={createInput.gender.female}
          onChange={handleChangeCheckbox}
        />
        F
        <input
          name="male"
          type="checkbox"
          className="create-form__checkbox"
          checked={createInput.gender.male}
          onChange={handleChangeCheckbox}
        />
        M
        <input
          name="other"
          type="checkbox"
          className="create-form__checkbox"
          checked={createInput.gender.other}
          onChange={handleChangeCheckbox}
        />
        Other
      </label>
      <label htmlFor="buddies" className="create-form__label">
        Buddies:
        <input
          name="buddies"
          type="number"
          placeholder="How many people can join?"
          value={createInput.buddies}
          onChange={handleChangeInput}
          className="create-form__input"
        />
      </label>
      <label htmlFor="images" className="create-form__label">
        Images:
        <input
          name="images"
          type="text"
          placeholder="Put the link of an amazing picture!"
          value={createInput.images}
          onChange={handleChangeInput}
          className="create-form__input"
        />
      </label>
      <label htmlFor="summary" className="create-form__label create-form__label--text-area">
        Summary:
        <textarea
          name="description"
          placeholder="Tell me a little about your trip"
          value={createInput.summary}
          onChange={handleChangeTextArea}
          className="create-form__text-area"
        />
      </label>
      <label htmlFor="description" className="create-form__label create-form__label--text-area">
        Description:
        <textarea
          name="description"
          placeholder="Tell me more!"
          value={createInput.description}
          onChange={handleChangeTextArea}
          className="create-form__text-area create-form__text-area--long"
        />
      </label>
      <label htmlFor="places" className="create-form__label create-form__label--text-area">
        Places:
        <textarea
          name="places"
          placeholder="Which landmarks will you be visiting? Separate them with a coma (',')."
          value={createInput.places}
          onChange={handleChangeTextArea}
          className="create-form__text-area"
        />
      </label>
      <label htmlFor="activities" className="create-form__label">
        Activities:
        <select
          name="activities"
          value={createInput.activities}
          onChange={handleChangeSelect}
          className="create-form__select"
          multiple
        >
          {activities.map((activity) => (
            <option key={activity.id} value={activity.activity}>{activity.activity}</option>
          ))}
        </select>
      </label>
      <div className="create-form__btn-wrapper">
        <button type="submit" className="create-form__btn">Create trip</button>
      </div>
    </form>
  );
};

export default CreateTripForm;