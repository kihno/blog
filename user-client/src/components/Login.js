import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import apis from "../api";

const Login = (props) => {
    const { setLogin, setHide } = props;

    const [user, setUser] = useState({username:'', password:''});
    const [cookie, setCookie] = useCookies(['jwt_token']);

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
            setCookie('jwt_token', res.data);
            setUser({username:'', password:''});
            setHide(true);
        });
    }

    return(
        <section className="login">
            <form action='#'>
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