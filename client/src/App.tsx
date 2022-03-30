import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Search from './components/Search';
import About from './components/About';
import './App.css';

// const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5500';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about-us" element={<About />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
