import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainHeader from '../MainHeader';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addUser } from '../../slices/user';
import { fetchApi } from '../../helpers/api';
import './style.css';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const data = await fetchApi('/api/auth/logout', {
      method: 'POST',
    });

    if (data.status === 'error') {
      console.error(data.message);
      return;
    }

    dispatch(addUser(null));
    navigate('/');
  };

  return user && (
    <main className="profile">
      <MainHeader title={`Nice to see you, ${user.username}!`} links={[{ name: 'home', href: '/' }, { name: 'profile', href: '/profile' }]} />
      <div className="profile__bcg">
        <section className="profile__buttons">
          <button type="submit" className="profile__btn">My profile account</button>
          <button type="submit" className="profile__btn">Requests</button>
          <Link to="/profile/my-trips" className="profile__btn">My trips</Link>
          <button type="submit" className="profile__btn profile__btn--logout" onClick={handleLogout}>LOGOUT</button>
        </section>
      </div>
      <img className="profile__img" src="/images/bg_desktop.png" alt="car" />
    </main>
  );
};

export default Profile;
