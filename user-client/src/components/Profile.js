import React from 'react';

const Profile = (props) => {
    const { user } = props;

    return(
        <section className='profile'>
            <p>{!user ? 'No user information' : user}</p>
        </section>
    )
}

export default Profile;