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
    const [passwordMessage, setPasswordMessage] = useState('');
    const [emailError, setEmailError] = useState({valid: false});
    const [usernameError, setUsernameError] = useState({valid: false});
    const [passwordError, setPasswordError] = useState({valid: false});
    const [confirmPasswordError, setConfirmPasswordError] = useState({valid: false});
    const [valid, setValid] = useState(false);
    const [error, setError] = useState(null);

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

    // function validatePassword() {
    //     if (user.password !== user.confirmPassword) {
    //         setValid(false);
    //         setPasswordMessage('Passwords do not match.');
    //     } else if (user.password === user.confirmPassword) {
    //         setValid(true);
    //         setPasswordMessage('');
    //     }
    // }

    function validateForm(e) {
        if (user.email === '') {
            setEmailError({valid: false, error: 'Please input valid email.'});
            setValid(false);
        } else {
            setEmailError({valid: true});
        }

        if (user.username === '') {
            setUsernameError({valid: false, error: 'Please input username.'});
            setValid(false);
        } else {
            setUsernameError({valid: true});
        }

        if (user.password === '') {
            setPasswordError({valid: false, error: 'Please input a password.'});
            setValid(false);
        } else {
            setPasswordError({valid: true});
        }

        if (user.password !== user.confirmPassword) {
            setConfirmPasswordError({valid: false, error: 'Passwords do not match.'});
            setValid(false);
        } else {
            setConfirmPasswordError({valid: true});
        }

        // if (emailError.valid && usernameError.valid && passwordError.valid && confirmPasswordError.valid) {
        //     setValid(true);
        // }
    }

    function handleSubmit(e) {
        e.preventDefault();

        validateForm()

        if (emailError.valid && usernameError.valid && passwordError.valid && confirmPasswordError.valid) {
            console.log(emailError.valid);
            console.log(usernameError.valid);
            console.log(passwordError.valid);
            console.log(confirmPasswordError.valid);
            apis.insertUser(user).then(res => {
                navigate('/login');
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
                <label htmlFor='email'>Email:
                    <input required type='email' name='email' value={user.email} onChange={handleEmailInput}></input>
                    <span className="emailError">{emailError.error}</span>
                </label>
                
                <label htmlFor='username'>Username:
                    <input required type='text' name='username' value={user.username} onChange={handleUsernameInput}></input>
                    <span className="usernameError">{usernameError.error}</span>
                </label>
                
                <label htmlFor='password'>Password:
                    <input required type='password' name='password' value={user.password} onChange={handlePasswordInput}></input>
                    <span className="passwordError">{passwordError.error}</span>
                </label>
                
                <label htmlFor='confirmPassword'>Confirm Password:
                    <input required type='password' name='confirmPassword' value={user.confirmPassword} onChange={handleConformPasswordInput}></input>
                    <span className="confirmPasswordError">{confirmPasswordError.error}</span>
                </label>
                
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
       </section> 
    )
}

export default SignUp;