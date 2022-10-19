import React, { useState } from 'react';
import apis from '../api/index';

const SignUp = () => {
    const [user, setUser] = useState({});
    const [isValid, setValid] = useState(true);
    const [passwordMessage, setPasswordMessage] = useState('');

    function handleEmailInput(e) {
        const email = e.target.value;

        setUser({...user, email});
    }

    function handleUsernameInput(e) {
        const username = e.target.value;

        setUser({...user, username});
    }

    function handlePasswordInput(e) {
        const password = e.target.value;

        setUser({...user, password});
    }

    function handleConformPasswordInput(e) {
        const confirmPassword = e.target.value;

        setUser({...user, confirmPassword});
    }

    function validatePassword() {
        if (user.password !== user.confirmPassword) {
            setValid(false);
            setPasswordMessage('Passwords do not match.');
        } else if (user.password === user.confirmPassword) {
            setValid(true);
            setPasswordMessage('');
        }
    }

    function handleSubmit(e) {
        if (user.password !== user.confirmPassword) {
            e.preventDefault();
            setValid(false);
            setPasswordMessage('Passwords do not match.');
        } else {
           apis.insertUser(user);
        }
    }

    return(
       <section className='signup'>
            <h1>Sign Up Form</h1>
            <form className='signupForm' action='/users'>
                <label htmlFor='email'>Email:
                    <input type='email' name='email' value={user.email} onChange={handleEmailInput} required={true}></input>
                </label>
                <label htmlFor='username'>Username:
                    <input type='text' name='username' value={user.username} onChange={handleUsernameInput} required={true}></input>
                </label>
                <label htmlFor='password'>Password:
                    <input type='password' name='password' value={user.password} onChange={handlePasswordInput} required={true}></input>
                </label>
                <label htmlFor='confirmPassword'>Confirm Password:
                    <input type='password' name='confirmPassword' className={isValid ? '' : 'invalid'} value={user.confirmPassword} onChange={handleConformPasswordInput} required={true}></input>
                    <span>{passwordMessage}</span>
                </label>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
       </section> 
    )
}

export default SignUp;