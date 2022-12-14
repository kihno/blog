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
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import AdminLogin from '../components/AdminLogin';
import apis from '../api/index';

function App() {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token', 'user_id', 'admin', 'username']);

  useEffect(() => {
    apis.getAllPosts().then(res => {
      setPosts(res.data);
    });

    apis.getAllUsers().then(res => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (getCookie('jwt_token')) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  function getCookie(name) {
    const cookieArr = document.cookie.split(';');

    for (let i=0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split('=');

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
  }

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} setLogin={setLogin} cookies={cookies} setCookie={setCookie} getCookie={getCookie} removeCookie={removeCookie} />
      <Routes>
        <Route path='/'  element={<Home posts={posts} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login setLogin={setLogin} setCookie={setCookie} />} />
        <Route path='/posts/:id'  element={<Post isLoggedIn={isLoggedIn} setLogin={setLogin} getCookie={getCookie} />} />
        <Route path='/users/:id'  element={<Profile isLoggedIn={isLoggedIn} setCookie={setCookie} getCookie={getCookie} />} />
        <Route path='/users'  element={<UserList users={users} getCookie={getCookie} />} />
        <Route path='/admin' element={<AdminLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
