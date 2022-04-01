import React, { useState, useEffect } from 'react';
import { IUser } from '../../../types';
import { fetchApi } from '../../../helpers/api';
import './style.css';

interface UserCardProps {
  id: number;
}

const UserCard = ({ id }: UserCardProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchApi<IUser>(`/api/users/${id}`);
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      setUser(data.data);
    };

    fetchUser();
  }, []);

  return (
    <article className="user-card">
      {user ? (
        <>
          <div className="user-card__info">
            <h2 className="user-card__title">
              {user.name.split(' ')[0]}
              ,
              {' '}
              {user.age}
              {' '}
              y.o.
            </h2>
            <p className="user-card__country">{user.gender}</p>
            <p className="user-card__summary">{user.summary || 'This is a fake description for the user'}</p>
            <div className="user-card__footer">
              <p>{user.country}</p>
              <p>{user.languages.join(', ')}</p>
            </div>
          </div>
          <img src={user.avatar || '/images/avatar.webp'} alt="avatar" className="user-card__avatar" />
        </>
      ) : <p>Loading</p>}
    </article>
  );
};

export default UserCard;
