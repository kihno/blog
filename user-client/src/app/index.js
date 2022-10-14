import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Post from '../components/Post';
import UserList from '../components/UserList';
import Profile from '../components/Profile';
import axios from 'axios';

const baseURL = 'http://localhost:7000';

function App() {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/posts`).then((res) => {
      setPosts(res.data);
    });

    axios.get(`${baseURL}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/'  element={<Home posts={posts} />} />
        <Route path='/posts/:id'  element={<Post />} />
        <Route path='/profile'  element={<Profile />} />
        <Route path='/users'  element={<UserList users={users} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
