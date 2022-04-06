import React from 'react';
import { Navigate } from 'react-router-dom';
import MainHeader from '../MainHeader';
import { useAppSelector } from '../../hooks';
import './style.css';

const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5500';

const Login = () => {
  const user = useAppSelector((state) => state.user.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="login">
      <MainHeader title="LOGIN" links={[{ name: 'home', href: '/' }, { name: 'login', href: '/login' }]} />
      <section className="login__google">
        <h2 className="login__title">Login with your Google account:</h2>
        <a className="login__button" href={`${host}/api/auth/login/google`}>
          <img className="login__button-img" src="/images/google.jpg" alt="google" />
          <p className="login__button-title">Google</p>
        </a>
        <p className="login__register">
          Do not have an account ?
          <a className="login__register-link" href={`${host}/api/auth/login/google`}>Register</a>
        </p>
        <img className="login__img" src="/images/surfer.png" alt="surfer" />
      </section>

    </main>
  );
};

export default Login;
