import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apis from '../api';

const UpdateUser = (props) => {
    const { user, setUser, getCookie, setCookie } = props;
    const { id } = useParams();
    const navigate = useNavigate();

    const [updateUser, setUpdateUser] = useState(user);
    const [token, setToken] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState({valid: true, message: 'Username cannot be empty.'});
    const [emailError, setEmailError] = useState({valid: true, message: 'Email cannot be empty.'});
    const [passwordError, setPasswordError] = useState({valid: true, message: 'Password cannot be empty.'});
    const [confirmPasswordError, setConfirmPasswordError] = useState({valid: true, message: 'Passwords do not match.'});

    useEffect(() => {
        const token = getCookie('jwt_token');

        setToken(token);
    }, [getCookie]);

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function handleInputChange(e) {
        let field = e.target.name;
        let value = e.target.value;

        setUpdateUser({...user, [field]: value}, validateForm(field, value));
    }

    function validateForm(field, value) {
        let valid;
        let message;
        switch(field) {
            case 'username':
                valid = value.length > 0;
                message = 'Username cannot be empty.';
                setUsernameError({valid, message});
                break;
            case 'email':
                valid = value.length > 0;
                message = 'Email cannot be empty.';
                setEmailError({valid, message});
                break;
            case 'password':
                valid = value.length > 0;
                let updatePassword = value;
                message = 'Password cannot be empty.'
                setPasswordError({valid, message, updatePassword});
                break;
            case 'confirmPassword':
                valid = value === passwordError.updatePassword;
                message = 'Passwords do not match';
                setConfirmPasswordError({valid, message});
                break;
            default:
                break;
        }
    }

    function handleProfileUpdate(e) {
        e.preventDefault();

        if (usernameError.valid && emailError.valid && passwordError.valid && confirmPasswordError.valid) {
            apis.updateUser(updateUser, id, token).then(res => {
                setUser(res.data);
            }).catch(error => {
                console.log(error);
                let message = error.response.data.error.split(': ');

                if (message[0] === 'emailError') {
                    setEmailError({valid: false, error: message[1]});
                }

                if (message[0] === 'usernameError') {
                    setUsernameError({valid: false, error: message[1]});
                }
           });
           setCookie('username', updateUser.username, {path: '/', maxAge: 3600});
        }
    }

    function handlePasswordUpdate() {
        
    }

    return(
        <section className='profileForm'>
            <form className='updateProfile'>
                <label htmlFor='username'>Username:
                    <input type='text' name='username' onChange={handleInputChange} value={updateUser.username}></input>
                    {!usernameError.valid && <span className='usernameError'>{usernameError.message}</span>}
                </label>
                <label htmlFor='email'>Email:
                    <input type='email' name='email' onChange={handleInputChange} value={updateUser.email}></input>
                    {!emailError.valid && <span className='emailError'>{emailError.message}</span>}
                </label>
                <button type='submit' onClick={handleProfileUpdate}>Submit</button>
            </form>
            <button onClick={togglePassword}>Update Password</button>
            {!showPassword ? null : 
                <form className='updatePassword'>
                    <label htmlFor='password'>Password:
                        <input type='password' name='password' onChange={handleInputChange}></input>
                        {!passwordError.valid && <span className='passwordError'>{passwordError.message}</span>}
                    </label>
                    <label htmlFor='confirmPassword'>Confirm Password:
                        <input type='password' name='confirmPassword' onChange={handleInputChange}></input>
                        {!confirmPasswordError.valid && <span className='confirmPasswordError'>{confirmPasswordError.message}</span>}
                    </label>
                    <button type='submit' onClick={handleProfileUpdate}>Submit</button>
                </form>
            }
        </section>
    )
}

export default UpdateUser;