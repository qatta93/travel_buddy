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
import Trip from './components/Trip';
import CreateTrip from './components/CreateTrip';
import './App.css';
import { addUser, UserInfo } from './slices/user';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const data = await fetchApi<UserInfo | null>('/api/auth/user');
        if (data.status === 'error') {
          console.error(data.message);
          return;
        }
        dispatch(addUser(data.data));
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
