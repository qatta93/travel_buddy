import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader';
import { IUser } from '../../types';
import { fetchApi } from '../../helpers/api';
import UserCard from '../Trip/UserCard';
import './style.css';

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    let valid = true;
    const fetchUsers = async () => {
      const data = await fetchApi<IUser[]>('/api/users');

      if (!valid) {
        return;
      }

      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setUsers(data.data);
    };

    fetchUsers();

    return () => { valid = false; };
  });

  return (
    <section className="users">
      <MainHeader
        title="All your travel buddies!"
        links={[{ name: 'home', href: '/' }, { name: 'users', href: '/users' }]}
      />
      <div className="users__board">
        {users.map((u) => (
          <Link key={u.id} className="users__link" to={`/users/${u.id}`}>
            <UserCard id={u.id} />
          </Link>
        ))}
      </div>
      <img className="users__img" src="/images/bg_desktop.png" alt="car" />
    </section>
  );
};

export default Users;
