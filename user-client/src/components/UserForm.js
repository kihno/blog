import React, { useState } from 'react';

const UpdateUser = (props) => {
    const { user, setUser } = props;

    const [showPassword, setShowPassword] = useState(false);

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function handleUsernameInput(e) {
        const updateUsername = e.target.value;

        setUser({...user, username: updateUsername})
    }

    function handleEmailInput(e) {
        const updateEmail = e.target.value;

        setUser({...user, email: updateEmail});
    }

    function handlePasswordInput(e) {
        const updatePassword = e.target.value;

        setUser({...user, password: updatePassword});
    }

    function handleConfirmPasswordInput(e) {
        const updateConfirmPassword = e.target.value;

        setUser({...user, password: updateConfirmPassword});
    }

    function handleProfileUpdate() {

    }

    function handlePasswordUpdate() {
        
    }

    return(
        <section>
            <form className='updateProfile'>
                <label htmlFor='username'>Username:
                    <input name='username' onChange={handleUsernameInput} value={user.username}></input>
                </label>
                <label htmlFor='email'>Email:
                    <input name='email' onChange={handleEmailInput} value={user.email}></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={togglePassword}>Update Password</button>
            {!showPassword ? null : 
                <form className='updatePassword'>
                    <label htmlFor='password'>Password:
                        <input name='password' onChange={handlePasswordInput}></input>
                    </label>
                    <label htmlFor='confirmPassword'>Confirm Password:
                        <input name='confirmPassword' onChange={handleConfirmPasswordInput}></input>
                    </label>
                    <button>Submit</button>
                </form>
            }
        </section>
    )
}

export default UpdateUser;