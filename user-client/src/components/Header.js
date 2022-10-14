import React from 'react';
import UserList from './UserList';

const Header = (props) => {
    const { user, isLoggedIn } = props;

    function UserHeader() {
        return(
            <div className='user'>
                <h2>Welcome <a href={'/users' + user.id}>{user.username}</a></h2>
                <button className='logout'>Logout</button>
            </div>
        )
    }

    function GuestHeader() {
        return(
            <div className='guest'>
                <button className='login'>Log In</button>
                <button className='adminLogin'>Admin</button>
            </div>
        )
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
            
        </header>
    )
}

export default Header;