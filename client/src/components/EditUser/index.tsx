import React, { useState, useEffect } from 'react';
import MainHeader from '../MainHeader';
import FormEditUser from './FormEditUser';
import { IUser } from '../../types';
import { fetchApi } from '../../helpers/api';
import { useAppSelector } from '../../hooks';
import './style.css';

const EditUser = () => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    let valid = true;

    const getUserDetails = async () => {
      if (!user) {
        return;
      }

      const data = await fetchApi<IUser>(`/api/users/${user.id}`);

      if (!valid) {
        return;
      }

      if (data.status === 'error') {
        console.error(data.message);
        return;
      }

      setUserDetails(data.data);
    };

    getUserDetails();

    return () => { valid = false; };
  }, []);

  return (
    <main className="edit-user">
      <MainHeader
        title={(user && user.username === 'pending') ? 'Finalise creating your account!' : 'Edit your profile'}
        links={[
          { name: 'home', href: '/' },
          { name: 'profile', href: '/profile' },
          { name: 'account', href: '/edit-profile' },
        ]}
      />
      {userDetails && (
        <section className="edit-user__form">
          <FormEditUser user={userDetails} />
        </section>
      )}
      <img className="edit-user__img" src="/images/bg_desktop.png" alt="car" />
    </main>
  );
};

export default EditUser;
