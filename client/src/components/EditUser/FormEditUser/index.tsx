import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICountry, ILanguage, IUser } from '../../../types';
import { fetchApi } from '../../../helpers/api';
import { useAppDispatch } from '../../../hooks';
import { addUser } from '../../../slices/user';
import './style.css';

interface EditUserInput {
  name: string,
  username: string,
  age: string,
  country: string,
  gender: string,
  summary: string,
  avatar: string,
  languages: string[],
}

interface EditUserFormProps {
  user: IUser,
}

const EditUserForm = ({ user }: EditUserFormProps) => {
  const userInitialValues = {
    ...user,
    username: user.username === 'pending' ? '' : user.username,
    age: user.age ? user.age.toString() : '',
    avatar: user.avatar || '',
    languages: user.languages.map((l) => l.language),
    gender: user.gender === 'pending' ? '' : user.gender,
  };

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [editUserInput, setEditUserInput] = useState<EditUserInput>(userInitialValues);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCountriesAndLanguages = async () => {
      const [countriesData, languageData] = await Promise.all([
        fetchApi<ICountry[]>('/api/countries'),
        fetchApi<ILanguage[]>('/api/languages'),
      ]);
      if (countriesData.status === 'success') {
        setCountries(countriesData.data);
      }
      if (languageData.status === 'success') {
        setLanguages(languageData.data);
      }
    };

    fetchCountriesAndLanguages();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedUser = {
      email: user.email,
      username: editUserInput.username,
      name: editUserInput.name,
      gender: editUserInput.gender,
      age: editUserInput.age,
      country: editUserInput.country,
      summary: editUserInput.summary,
      avatar: editUserInput.avatar,
      languages: editUserInput.languages,
    };

    const data = await fetchApi(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (data.status === 'error') {
      console.error(data.message);
      return;
    }

    setEditUserInput(userInitialValues);
    dispatch(addUser({ id: user.id, username: updatedUser.username }));
    navigate('/profile');
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditUserInput((currentState) => ({
      ...currentState,
      [event.target.name]: Array.from(event.target.selectedOptions, (option) => option.value),
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditUserInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditUserInput((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  const languagesSorted = [...languages].sort((a, b) => {
    if (a.language < b.language) {
      return -1;
    }
    if (a.language < b.language) {
      return 1;
    }
    return 0;
  });

  return (
    <form className="edit-user-form" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name" className="edit-user-form__label">
        Name:
        <input
          name="name"
          type="text"
          placeholder="My name is..."
          value={editUserInput.name}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        />
      </label>
      <label htmlFor="username" className="edit-user-form__label">
        Username:
        <input
          name="username"
          type="text"
          placeholder="My username is..."
          value={editUserInput.username}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        />
      </label>
      <label htmlFor="age" className="edit-user-form__label">
        Age:
        <input
          name="age"
          type="number"
          min="15"
          max="100"
          placeholder="My age is..."
          value={editUserInput.age}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        />
      </label>
      <label htmlFor="country" className="edit-user-form__label">
        Country:
        <select
          name="country"
          placeholder="country"
          value={editUserInput.country}
          onChange={handleChangeInput}
          className="edit-user-form__input"
          required
        >
          {countries.map((c) => <option key={c.id} value={c.country}>{c.country}</option>)}
        </select>
      </label>
      <label htmlFor="gender" className="edit-user-form__label">
        Gender:
        <select
          name="gender"
          className="edit-user-form__input"
          value={editUserInput.gender}
          onChange={handleChangeInput}
          required
        >
          <option hidden disabled value="">Select an option:</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
      </label>
      <label htmlFor="languages" className="edit-user-form__label">
        Languages:
        <select
          name="languages"
          value={editUserInput.languages}
          onChange={handleChangeSelect}
          className="edit-user-form__select"
          multiple
          required
        >
          {languagesSorted.map((language) => (
            <option key={language.id} value={language.language}>{language.language}</option>
          ))}
        </select>
      </label>
      <label htmlFor="avatar" className="edit-user-form__label">
        Avatar:
        <input
          name="avatar"
          type="text"
          placeholder="Put the link of an amazing selfie!"
          value={editUserInput.avatar}
          onChange={handleChangeInput}
          className="edit-user-form__input"
        />
      </label>
      <label htmlFor="summary" className="edit-user-form__label edit-user-form__label--text-area">
        About me:
        <textarea
          name="summary"
          placeholder="Tell the others about you!"
          value={editUserInput.summary}
          onChange={handleChangeTextArea}
          className="edit-user-form__text-area"
          required
        />
      </label>
      <div className="edit-user-form__btn-wrapper">
        <button type="submit" className="edit-user-form__btn">Save changes</button>
      </div>
    </form>
  );
};

export default EditUserForm;
