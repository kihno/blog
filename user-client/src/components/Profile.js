import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apis from '../api';

const Profile = (props) => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        apis.getUserById(id).then(res => {
            setUser(res.data);
        });

    }, [id]);

    return(
        <section className='profile'>
            {!user ? 'No user information' : 
                <div className='user-username'>
                    <h2>Username:</h2>
                    <span>{user.username}</span>
                </div>
            }
        </section>
    )
}

export default Profile;