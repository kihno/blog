import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Comments from './Comments';
import apis from '../api/index';
import { useParams } from 'react-router-dom';

const Post = (props) => {
    const { isLoggedIn, setLogin, setToken, getCookie } = props;
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        apis.getPostById(id).then(res => {
            setPost(res.data);
        });

        apis.getPostComments(id).then(res => {
            setComments(res.data);
        })
    }, [id]);

    function PostArticle() {
        return(
            <article className='post'>
                <h1 className='postTitle'>{post.title}</h1>
                <div className='postHeader'>
                    <h4 className='postUser'>{'Posted By: '}
                        <a className='userLink' href={'/users/' + post.user._id}>{post.user.username}</a>
                    </h4>
                    <span>{format(new Date(post.createdAt), 'PPp')}</span>
                </div>
                <p className='postText'>{post.text}</p>

                <Comments postId={id} isLoggedIn={isLoggedIn} setLogin={setLogin} getCookie={getCookie} /> 
            </article>
        )
    }
    
    return(
        <div className='postContainer'>
            {!post ? 'Loading...' : <PostArticle />}
        </div>
    )
}

export default Post;