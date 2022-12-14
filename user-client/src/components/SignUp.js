import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis from '../api/index';

const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [emailError, setEmailError] = useState({valid: false});
    const [usernameError, setUsernameError] = useState({valid: false});
    const [passwordError, setPasswordError] = useState({valid: false});
    const [confirmPasswordError, setConfirmPasswordError] = useState({valid: false});

    function handleEmailInput(e) {
        const email = e.target.value;
        setUser({...user, email});

        if (user.email !== '') {
            setEmailError({valid: true});
        }
    }

    function handleUsernameInput(e) {
        const username = e.target.value;
        setUser({...user, username});

        if (user.username !== '') {
            setUsernameError({valid: true});
        }
    }

    function handlePasswordInput(e) {
        const password = e.target.value;
        setUser({...user, password});

        if (user.password !== '') {
            setPasswordError({valid: true});
        }
    }

    function handleConformPasswordInput(e) {
        const confirmPassword = e.target.value;
        setUser({...user, confirmPassword});

        if (confirmPassword !== user.password) {
            setConfirmPasswordError({valid: false, error: 'Passwords do not match'});
        } else {
            setConfirmPasswordError({valid: true});
        }
    }

    function validateForm(e) {
        if (user.email === '') {
            setEmailError({valid: false, error: 'Please input valid email.'});
        } else {
            setEmailError({valid: true});
        }

        if (user.username === '') {
            setUsernameError({valid: false, error: 'Please input username.'});
        } else {
            setUsernameError({valid: true});
    }

        if (user.password === '') {
            setPasswordError({valid: false, error: 'Please input a password.'});
        } else {
            setPasswordError({valid: true});
        }

        if (user.password !== user.confirmPassword) {
            setConfirmPasswordError({valid: false, error: 'Passwords do not match.'});
        } else {
            setConfirmPasswordError({valid: true});
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        validateForm();

        if (emailError.valid && usernameError.valid && passwordError.valid && confirmPasswordError.valid) {
            apis.insertUser(user).then(() => {
                navigate('/login', { state: { message: 'Sign up successful. Log in to continue.' } });
            }).catch(error => {
                let message = error.response.data.error.split(': ');

                if (message[0] === 'emailError') {
                    setEmailError({valid: false, error: message[1]});
                }

                if (message[0] === 'usernameError') {
                    setUsernameError({valid: false, error: message[1]});
                }
           });
        }

    };

    return(
       <section className='signup'>
            <h1>Sign Up Form</h1>
            <form className='signupForm'>
                <div className='form-row'>
                    <label htmlFor='email'>Email:</label>
                    <input required type='email' name='email' value={user.email} onChange={handleEmailInput}></input>
                    <span className="error emailError">{emailError.error}</span>
                </div>
                <div className='form-row'>
                    <label htmlFor='username'>Username:</label>
                    <input required type='text' name='username' value={user.username} onChange={handleUsernameInput}></input>
                    <span className="error usernameError">{usernameError.error}</span>
                </div>
                <div className='form-row'>
                    <label htmlFor='password'>Password:</label>
                    <input required type='password' name='password' value={user.password} onChange={handlePasswordInput}></input>
                    <span className="error passwordError">{passwordError.error}</span>
                </div>
                <div className='form-row'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input required type='password' name='confirmPassword' value={user.confirmPassword} onChange={handleConformPasswordInput}></input>
                    <span className="error confirmPasswordError">{confirmPasswordError.error}</span>
                </div>
                <button className='submitBtn' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
       </section> 
    )
}

export default SignUp;