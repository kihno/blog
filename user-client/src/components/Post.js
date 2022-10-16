import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import axios from 'axios';
import apis from '../api/index';
import { useParams } from 'react-router-dom';

const Post = (props) => {
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

    // console.log(post);
    // console.log(comments);
    
    return(
        <article className='post'>
            <h1 className='postTitle'>{!post ? 'Loading...' : post.title}</h1>
            <h4 className='postUser'>Posted By: {!post ? '' : post.user.username}</h4>
            <p className='postText'>{!post ? '' : post.text}</p>

            <Comments comments={comments} /> 
        </article>
    )
}

export default Post;