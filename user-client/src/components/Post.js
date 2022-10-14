import React from 'react';
import Comments from './Comments';

const Post = (props) => {
    const { post } = props;

    return(
        <article className='post'>
            <h1 className='postTitle'>{post.title}</h1>
            <h4 className='postUser'>Posted By: {post.user}</h4>
            <p className='postText'>{post.text}</p>

            <Comments comments={post.comments} /> 
        </article>
    )
}

export default Post;