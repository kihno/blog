import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {
    const { users, getCookie } = props;

    return(
        <section className='userList'>
            <ul>
            {users && users.map(user => {
                return( 
                    <li key={user._id}>
                        <Link
                            to={{
                                pathname: '/users/' + user._id,
                                state: { getCookie: getCookie }
                            }}
                        />
                        <a href={'/users/' + user._id}>{user.username}</a>
                    </li>
                )
            })}
            </ul>
        </section>
    )
}

export default UserList;