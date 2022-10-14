import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Post from '../components/Post';
import UserList from '../components/UserList';
import Profile from '../components/Profile';

function App() {
  const [data, setdata] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    fetch('/')
      .then((res) => res.json())
      .then((data) => setdata(data.message));
  }, []);

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/posts/:id'  element={<Post />} />
        <Route path='/profile'  element={<Profile />} />
        <Route path='/users'  element={<UserList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
