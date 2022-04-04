import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Search from './components/Search';
import About from './components/About';
import Trip from './components/Trip';
import CreateTrip from './components/CreateTrip';
import './App.css';

const App = () => {
  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/auth/user', {
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getLoggedUser();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="create-trip" element={<CreateTrip />} />
        <Route path="trips">
          <Route index element={<Search />} />
          <Route path=":id" element={<Trip />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
