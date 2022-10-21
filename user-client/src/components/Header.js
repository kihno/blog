import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';


const Header = (props) => {
    const { user, isLoggedIn, setLogin, cookies, setCookie, removeCookie } = props;

    const [hidden, setHide] = useState(true);
    const navigate = useNavigate();

    function UserHeader() {
        return(
            <div className='user'>
                <h2>Welcome <a href={'/users'}>{user && user.username}</a></h2>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    function GuestHeader() {
        return(
            <div className='guest'>
                <button className='login' onClick={handleLoginClick}>Log In</button>
                <button className='login' onClick={handleSignupClick}>Sign Up</button>
                <button className='adminLogin'>Admin</button>
            </div>
        )
    }

    function handleLoginClick() {
        setHide(!hidden);
    }

    function handleSignupClick() {
        navigate('/signup');
    }

    const handleLogout = () => {
        removeCookie('jwt_token', {path: '/'});
        removeCookie('user_id', {path: '/'});
        removeCookie('admin', {path: '/'});
        setLogin(false);
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
                <Login isLoggedIn={isLoggedIn} setLogin={setLogin} setHide={setHide} cookies={cookies} setCookie={setCookie} />
            </div>
            
        </header>
    )
}

export default Header;