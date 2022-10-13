import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch('/')
      .then((res) => res.json())
      .then((data) => setdata(data.message));
  }, []);

  return (
    <div className='App'>
      <Header />
      <Home />
      <p>{!data ? 'Loading...' : data}</p>
      <Footer />
    </div>
  );
}

export default App;
