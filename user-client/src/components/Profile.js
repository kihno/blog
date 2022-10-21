import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apis from '../api';

const Profile = (props) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [hasPosts, setHasPosts] = useState(false);
    const { id } = useParams();
    
    useEffect(() => {
        apis.getUserById(id).then(res => {
            setUser(res.data);
        });
    }, [id]);

    useEffect(() => {
        apis.getAllPosts().then(res => {
            res.data.map(post => {
                console.log(id);
                console.log(post.user._id);
                if (post.user._id === id) {
                    setPosts(prevPosts => [...prevPosts, post])
                }
            });
        });
    }, []);

    useEffect(() => {
        if (posts.length > 0) {
            setHasPosts(true);
        }
    }, [posts]);

    return(
        <section className='profile'>
            {!user ? <div>No user information</div> : 
                <div className='user-username'>
                    <h2>Username:</h2>
                    <span>{user.username}</span>
                </div>
            }
            <div className='user-posts'>
                <h2>Posts:</h2>
                    <ul>
                        {hasPosts && posts.map(post => {
                        return <li><a href={'/posts/' + post._id}>{post.title}</a></li>
                        })}
                    </ul>
            </div>
        </section>
    )
}

export default Profile;