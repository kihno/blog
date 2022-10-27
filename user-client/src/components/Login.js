import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apis from "../api";

const Login = (props) => {
    const { setLogin, setHide, setCookie } = props;
    const [user, setUser] = useState({username:'', password:''});
    const location = useLocation();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const username = e.target.value;

        setUser({...user, username: username});
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;

        setUser({...user, password: password});
    }

    const handleLogin = (e) => {
        e.preventDefault();

        apis.login(user).then(res => {
            setLogin(true);
           
            setCookie('jwt_token', res.data.token, {path: '/', maxAge: 3600});
            setCookie('user_id', res.data.authUser.id, {path: '/', maxAge: 3600});
            setCookie('admin', res.data.authUser.admin, {path: '/', maxAge: 3600});
            setCookie('username', res.data.authUser.username, {path: '/', maxAge: 3600});

            setUser({username:'', password:''});
            if (setHide) {
                setHide(true);
            }
            
            if (location.pathname === '/login') {
                navigate(-2);
            }
        });
    }

    return(
        <section className="loginPage">
            {location.state && <div className='message'>{location.state.message}</div>}
            <form className='loginForm' action='#'>
                <label htmlFor='username'>Username:
                    <input type='text' name='username' value={user.username} onChange={handleUsernameChange}></input>
                </label>
                <label htmlFor='password'>Password:
                    <input type='password' name='password' value={user.password} onChange={handlePasswordChange}></input>
                </label>
                <button type='submit' onClick={handleLogin}>Log In</button>
            </form>
        </section>
    )
}

export default Login;