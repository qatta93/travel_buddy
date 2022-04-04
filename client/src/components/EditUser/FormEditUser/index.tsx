import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface INewTrip {
  id: number,
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

const parseGender = (gender: Gender): string | null => {
  if (gender.male) {
    return 'male';
  }
  if (gender.female) {
    return 'female';
  }
  if (gender.other) {
    return 'other';
  }
  return null;
};

const parsePlaces = (places: string): string[] => places.split(',').map((p) => p.trim());

const CreateTripForm = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [createInput, setCreateInput] = useState<CreateInput>(createInputInitialValue);
  const navigate = useNavigate();

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTrip = {
      ...createInput,
      authorId: 1,
      from: createInput.dateFrom,
      to: createInput.dateTo,
      maxPassengers: Number(createInput.buddies),
      genderRestrictions: parseGender(createInput.gender),
      places: parsePlaces(createInput.places),
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    };

    const data = await fetchApi<INewTrip>('/api/trips', fetchOptions);

    if (data.status === 'success') {
      setCreateInput(createInputInitialValue);
      navigate(`/trips/${data.data.id}`);
    }
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
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <label htmlFor="country" className="edit-user-form__label">
        Country:
        <select
          name="countries"
          value={createInput.countries}
          onChange={handleChangeSelect}
          className="edit-user-form__select"
          multiple
          required
        >
          {countries.map((country) => (
            <option key={country.id} value={country.country}>{country.country}</option>
          ))}
        </select>
      </label>
      <label htmlFor="date" className="edit-user-form__label edit-user-form__label--date">
        Date:
        <input
          name="dateFrom"
          type="date"
          placeholder="From.."
          value={createInput.dateFrom}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        />
        <span />
        <input
          name="dateTo"
          type="date"
          placeholder="To.."
          value={createInput.dateTo}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        />
      </label>
      <label htmlFor="budget" className="edit-user-form__label">
        Budget:
        <input
          name="budget"
          type="number"
          placeholder="My max. budget is.. [USD]"
          value={createInput.budget}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        />
      </label>
      <label htmlFor="gender" className="edit-user-form__label edit-user-form__label--checkbox">
        Gender:
        <input
          name="female"
          type="checkbox"
          className="edit-user-form__checkbox"
          checked={createInput.gender.female}
          onChange={handleChangeCheckbox}
        />
        F
        <input
          name="male"
          type="checkbox"
          className="edit-user-form__checkbox"
          checked={createInput.gender.male}
          onChange={handleChangeCheckbox}
        />
        M
        <input
          name="other"
          type="checkbox"
          className="edit-user-form__checkbox"
          checked={createInput.gender.other}
          onChange={handleChangeCheckbox}
        />
        Other
      </label>
      <label htmlFor="buddies" className="edit-user-form__label">
        Buddies:
        <input
          name="buddies"
          type="number"
          placeholder="How many people can join?"
          value={createInput.buddies}
          onChange={handleChangeInput}
          className="edit-user-form__input"
        />
      </label>
      <label htmlFor="images" className="edit-user-form__label">
        Images:
        <input
          name="images"
          type="text"
          placeholder="Put the link of an amazing picture!"
          value={createInput.images}
          onChange={handleChangeInput}
          className="edit-user-form__input"
        />
      </label>
      <label htmlFor="summary" className="edit-user-form__label edit-user-form__label--text-area">
        Summary:
        <textarea
          name="summary"
          placeholder="Tell me a little about your trip"
          value={createInput.summary}
          onChange={handleChangeTextArea}
          className="edit-user-form__text-area"
          required
        />
      </label>
      <label htmlFor="description" className="edit-user-form__label edit-user-form__label--text-area">
        Description:
        <textarea
          name="description"
          placeholder="Tell me more!"
          value={createInput.description}
          onChange={handleChangeTextArea}
          className="edit-user-form__text-area edit-user-form__text-area--long"
          required
        />
      </label>
      <label htmlFor="places" className="edit-user-form__label edit-user-form__label--text-area">
        Places:
        <textarea
          name="places"
          placeholder="Which landmarks will you be visiting? Separate them with a coma (',')."
          value={createInput.places}
          onChange={handleChangeTextArea}
          className="edit-user-form__text-area"
          required
        />
      </label>
      <label htmlFor="activities" className="edit-user-form__label">
        Activities:
        <select
          name="activities"
          value={createInput.activities}
          onChange={handleChangeSelect}
          className="edit-user-form__select"
          multiple
        >
          {activities.map((activity) => (
            <option key={activity.id} value={activity.activity}>{activity.activity}</option>
          ))}
        </select>
      </label>
      <div className="edit-user-form__btn-wrapper">
        <button type="submit" className="edit-user-form__btn">Create trip</button>
      </div>
    </form>
  );
};

export default CreateTripForm;
