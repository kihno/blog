import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';


const Header = (props) => {
    const { isLoggedIn, setLogin, cookies, setCookie, getCookie, removeCookie } = props;

    const [hidden, setHide] = useState(true);
    const navigate = useNavigate();
    const user = getCookie('username');
    const userId = getCookie('user_id')

    function UserHeader() {
        return(
            <div className='user'>
                <h2>Welcome <a href={'/users/' + userId}>{user}</a></h2>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    function GuestHeader() {
        return(
            <div className='guest'>
                <button className='loginButton' onClick={handleLoginClick}>Log In</button>
                <button className='signUpButton' onClick={handleSignupClick}>Sign Up</button>
                <button className='adminLogin' onClick={handleAdminClick}>Admin</button>
            </div>
        )
    }

    function handleLoginClick() {
        setHide(!hidden);
    }

    function handleSignupClick() {
        navigate('/signup');
    }

    function handleAdminClick() {
        navigate('/admin');
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
            <a href='/'>TTWTBDNS</a>
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

            <div className={hidden ? 'hide' : 'header-login'}>
                <Login isLoggedIn={isLoggedIn} setLogin={setLogin} setHide={setHide} cookies={cookies} setCookie={setCookie} />
            </div>
            
        </header>
    )
}

export default Header;