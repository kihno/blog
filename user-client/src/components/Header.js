import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import UserList from './UserList';
import Login from './Login';

const Header = (props) => {
    const { user, isLoggedIn, setLogin, setToken, setCookie } = props;
    const [cookie, removeCookie] = useCookies();

    const [hidden, setHide] = useState(true);

    function UserHeader() {
        return(
            <div className='user'>
                <h2>Welcome <a href={'/users'}>{!user ? '' : user.username}</a></h2>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    function GuestHeader() {
        return(
            <div className='guest'>
                <button className='login' onClick={handleClick}>Log In</button>
                <button className='adminLogin'>Admin</button>
            </div>
        )
    }

    function handleClick() {
        setHide(!hidden);
    }

    const handleLogout = (e) => {
        setLogin(false);
        setToken(null);
        removeCookie('jwt_token');
     }

    let greeting;
    if (isLoggedIn) {
        greeting = <UserHeader />
    } else {
        greeting = <GuestHeader />
    }

    return(
        <header className='header'>
            <h1 className='logo'>  
            <a href='/'>My Blog</a>
            </h1>
            <ul className='nav'>
                <li className='link'>
                    <a href='/'>Posts</a>
                </li>
                <li className='link'>
                    <a href='/users'>Users</a>
                </li>
            </ul>
            
            {greeting}

            <div className={hidden ? 'hide' : null}>
                <Login isLoggedIn={isLoggedIn} setLogin={setLogin} setToken={setToken} setHide={setHide} />
            </div>
            
        </header>
    )
}

export default Header;