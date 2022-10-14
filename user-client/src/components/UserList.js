import React from 'react';

const UserList = (props) => {
    const { users } = props;

    return(
        <section>
            <ul>
            {users && users.map(user => {
                return( 
                    <li key={user._id}>
                        <a href={'/users' + user._id}>{user.username}</a>
                    </li>
                )
            })}
            </ul>
        </section>
    )
}

export default UserList;