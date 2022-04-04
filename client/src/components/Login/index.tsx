import React from 'react';
import MainHeader from '../MainHeader';
import './style.css';

const Login = () => (
  <main className="login">
    <MainHeader title="LOGIN" links={[{ name: 'home', href: '/' }, { name: 'login', href: '/login' }]} />
    <section className="login__google">
      <h2 className="login__title">Login with your Google account:</h2>
      {/* <button type="submit" className="login__button"> */}
      <a className="login__button" href="http://localhost:5500/api/auth/login/google">
        <img className="login__button-img" src="/images/google.jpg" alt="google" />
        <p className="login__button-title">Google</p>
      </a>
      <p className="login__register">
        Do not have an account ?
        <span className="login__register-span">Register</span>
      </p>
      <img className="login__img" src="/images/surfer.png" alt="surfer" />
    </section>

  </main>
);

export default Login;