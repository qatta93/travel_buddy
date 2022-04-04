import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchApi } from './helpers/api';
import { useAppDispatch } from './hooks';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Search from './components/Search';
import About from './components/About';
import Requests from './components/Requests';
import Trip from './components/Trip';
import CreateTrip from './components/CreateTrip';
import EditUser from './components/EditUser';
import RestrictedRoute from './components/RestrictedRoute';
import { addUser } from './slices/user';
import { LoggedInUser } from './types';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLoggedUser = async () => {
      const data = await fetchApi<LoggedInUser>('/api/auth/user');
      if (data.status === 'error') {
        console.error(data.message);
        return;
      }
      dispatch(addUser(data.data));
    };
    getLoggedUser();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="create-trip" element={<RestrictedRoute><CreateTrip /></RestrictedRoute>} />
        <Route path="trips">
          <Route index element={<Search />} />
          <Route path=":id" element={<Trip />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="requests" element={<RestrictedRoute><Requests /></RestrictedRoute>} />
        <Route path="profile" element={<RestrictedRoute><Profile /></RestrictedRoute>} />
        <Route path="edit-user" element={<RestrictedRoute><EditUser /></RestrictedRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
