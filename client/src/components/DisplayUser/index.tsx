import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../types';
import { fetchApi } from '../../helpers/api';
// import { useAppSelector } from '../../hooks';
import MainHeader from '../MainHeader';
import DisplayCard from './DisplayCard';
import './style.css';

export const DisplayUser = () => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  // const user = useAppSelector((state) => state.user.user);
  const { id } = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      // if (!user) {
      //   return;
      // }

      const data = await fetchApi<IUser>(`/api/users/${id}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      console.log(data);
      setUserDetails(data.data);
    };

    getUserDetails();
  }, []);
  console.log(userDetails);
  return (
    <main className="display-user">
      <MainHeader
        title={(userDetails && userDetails.username.length > 0 ? `${userDetails.username}` : 'New User')}
        links={[
          { name: 'home', href: '/' },
          { name: 'account', href: '/account' },
          { name: 'profile', href: '/profile' },
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
