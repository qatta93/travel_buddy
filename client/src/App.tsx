import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Search from './components/Search';
import About from './components/About';
import Trip from './components/Trip';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about-us" element={<About />} />
      <Route path="trips">
        <Route index element={<Search />} />
        <Route path=":id" element={<Trip />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
