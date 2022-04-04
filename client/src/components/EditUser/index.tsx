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
    const getUserDetails = async () => {
      if (!user) {
        return;
      }

      const data = await fetchApi<IUser>(`/api/users/${user.id}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }

      setUserDetails(data.data);
    };

    getUserDetails();
  }, []);

  return (
    <main className="edit-user">
      <MainHeader
        title="Edit your profile account"
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
    </main>
  );
};

export default EditUser;
