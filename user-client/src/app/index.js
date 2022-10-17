import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Post from '../components/Post';
import UserList from '../components/UserList';
import Profile from '../components/Profile';
import Login from '../components/Login';
import apis from '../api/index';

// const baseURL = 'http://localhost:8080';

function App() {
  // const [URL, setURL] = useState(baseURL);
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);

  useEffect(() => {
    apis.getAllPosts().then(res => {
      setPosts(res.data);
    });

    apis.getAllUsers().then(res => {
      setUsers(res.data);
    });

    if (cookies.jwt_token) {
      setLogin(true);
    }
  }, [cookies]);

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} setLogin={setLogin} setToken={setToken} />
      <Routes>
        <Route path='/'  element={<Home posts={posts} />} />
        <Route path='/posts/:id'  element={<Post isLoggedIn={isLoggedIn} setLogin={setLogin} setToken={setToken} />} />
        <Route path='/profile'  element={<Profile />} />
        <Route path='/users'  element={<UserList users={users} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
