import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm';
import apis from '../api';

const Profile = (props) => {
    const { setCookie, getCookie } = props;

    const [user, setUser] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [canUpdate, setCanUpdate] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasPosts, setHasPosts] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { id } = useParams();
    
    useEffect(() => {
        apis.getUserById(id).then(res => {
            setUser(res.data);
        });

        apis.getAllPosts().then(res => {
            res.data.forEach(post => {
                if (post.user._id === id) {
                    setPosts(prevPosts => [...prevPosts, post])
                }
            });
        });
    }, [id]);

    useEffect(() => {
        const authUserId = getCookie('user_id');
        const authUserAdmin = getCookie('admin');

        setAuthUser({id: authUserId, admin: authUserAdmin});
        setShowForm(false);
    }, [user, getCookie]);

    useEffect(() => {
        if (authUser) {
            if (authUser.id === id || authUser.admin === 'true') {
                setCanUpdate(true);
            } else {
                setCanUpdate(false);
            }
        } else {
            setCanUpdate(false);
        }
    }, [authUser, id]);

    useEffect(() => {
        if (posts.length > 0) {
            setHasPosts(true);
        }
    }, [posts]);

    function renderForm() {
        setShowForm(!showForm);
    }

    return(
        <section className='profile'>
            {!user ? <div>No user information</div> : 
                <div className='user-profile'>
                    <h2>Username:</h2>
                    <span>{user.username}</span>
                    {canUpdate && <button onClick={renderForm}>Update Profile</button>}
                    {showForm && <UserForm user={user} setUser={setUser} setCookie={setCookie} getCookie={getCookie} />}
                </div>
            }
            <div className='user-posts'>
                <h2>Posts:</h2>
                    <ul>
                        {hasPosts && posts.map(post => {
                        return <li key={post._id}><a href={'/posts/' + post._id}>{post.title}</a></li>
                        })}
                    </ul>
            </div>
        </section>
    )
}

export default Profile;