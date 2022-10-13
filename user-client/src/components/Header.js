import React from 'react';

const Header = (props) => {

    return(
        <header className='header'>
            <h1 className='logo'>My Blog</h1>
            <ul className='nav'>
                <li className='link'>Posts</li>
                <li className='link'>Users</li>
            </ul>
            <button className='login'>Log In</button>
        </header>
    )
}

export default Header;