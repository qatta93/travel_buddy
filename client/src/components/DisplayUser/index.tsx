import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../types';
import { fetchApi } from '../../helpers/api';
import MainHeader from '../MainHeader';
import DisplayCard from './DisplayCard';
import './style.css';

export const DisplayUser = () => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await fetchApi<IUser>(`/api/users/${id}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setUserDetails(data.data);
    };

    getUserDetails();
  }, []);

  return (
    <main className="display-user">
      <MainHeader
        title={(userDetails && userDetails.username.length > 0 ? `${userDetails.username}` : 'New User')}
        links={[
          { name: 'home', href: '/' },
          { name: 'user', href: `/api/users/${id}` },
        ]}
      />
      {userDetails && (
        <section className="display-card">
          <DisplayCard user={userDetails} />
        </section>
      )}
      <img className="display-user__img" src="/images/bg_desktop.png" alt="car" />
    </main>
  );
};
