import React from 'react';
import MainHeader from '../MainHeader';
import FormEditUser from './FormEditUser';
import './style.css';

const EditUser = () => (
  <main className="edit-user">
    <MainHeader
      title="Edit your profile account"
      links={[
        { name: 'home', href: '/' },
        { name: 'profile', href: '/profile' },
        { name: 'account', href: '/edit-profile' },
      ]}
    />
    <section className="edit-user__form">
      <FormEditUser />
    </section>
  </main>
);

export default EditUser;
