import React from 'react';

const UserList = (props) => {
    const { users } = props;

    return(
        <section>
            <p>{!users ? "No users yet" : users}</p>

            {/* <ul>
            {users.map(user => {
                <li>
                    <a href={'/users' + user.id}>{user.username}</a>
                </li>
            })}
            </ul> */}
        </section>
    )
}

export default UserList;