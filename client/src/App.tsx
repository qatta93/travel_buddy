import React, { useEffect, useState } from 'react';
import './App.css';

const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5500';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}/api`);
      const data = await response.json();
      setMessage(data.message);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
};

export default App;
