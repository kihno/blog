import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'
import apis from '../api';
import CommentForm from './CommentForm';

const Comment = (props) => {
    const { isLoggedIn, postId, getCookie } = props;

    const [comments, setComments] = useState(null);

    useEffect(() => {
        apis.getPostComments(postId).then(res => {
            setComments(res.data);
        });
    }, [postId]);

    let sortComments;
    if (comments !== null) {
        sortComments = [...comments].sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
    }

    function CommentSection() {
        return(
            <section className='comments'>
                {sortComments.map(comment => {
                    return(
                        <div className='comment' key={comment._id}>
                            <div className='CommentHeader'>
                                <span><a href={'/users/' + comment.user._id}>{comment.user.username}</a></span>
                                <span>{format(new Date(comment.createdAt), 'PPp')}</span>
                            </div>
                            <div className='commentText'>{comment.text}</div>
                        </div>
                    )
                })}
            </section>
        )
    }

    function SignIn() {
        return(
            <section className='comment-login'>
                <button>Log In</button>
                <p>{'Log in to post comment. Or '}
                    <a href='/signup'>Sign Up</a>
                </p>
            </section>
        )
    }

    return(
        <div className='commentContainer'>
            {isLoggedIn ? <CommentForm postId={postId} setComments={setComments} getCooke={getCookie} /> : <SignIn />}
            {!comments ? "No comments yet." : <CommentSection />}
        </div>
    )
}

export default Comment;