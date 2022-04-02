import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Search from './components/Search';
import About from './components/About';
import Requests from './components/Requests';
import Trip from './components/Trip';
import CreateTrip from './components/CreateTrip';
import './App.css';

const App = () => (
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
      <Route path="requests" element={<Requests />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
