import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'
import apis from '../api';
import CommentForm from './CommentForm';

const Comment = (props) => {
    const { isLoggedIn, postId, getCookie } = props;

    const [comments, setComments] = useState(null);
    const [authUser, setAuthUser] = useState({});

    useEffect(() => {
        apis.getPostComments(postId).then(res => {
            setComments(res.data);
        });
    }, [postId]);

    useEffect(() => {
        const userId = getCookie('user_id');
        const admin = getCookie('admin');

        setAuthUser({
            id: userId,
            admin: admin
        });
    }, [getCookie]);

    let sortComments;
    if (comments !== null) {
        sortComments = [...comments].sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
    }

    function Comment(props) {
        const { comment } = props;

        return(
           
            <div className='comment' key={comment._id}>
                 {console.log(authUser)}
                <div className='CommentHeader'>
                    <span><a href={'/users/' + comment.user._id}>{comment.user.username}</a></span>
                    <span>{format(new Date(comment.createdAt), 'PPp')}</span>
                    {authUser.admin === 'true' || authUser.id == comment.user._id ? <button onClick={() => deleteComment(comment._id)}>X</button> : null}
                </div>
                <div className='commentText'>{comment.text}</div>
            </div>
        )
    }

    function deleteComment(commentId) {
        const token = getCookie('jwt_token');

        apis.deleteComment(postId, commentId, token).then(() => {
            apis.getPostComments(postId).then(res => {
                setComments(res.data);
            });
        });
    }

    function CommentSection() {
        return(
            <section className='comments'>
                {sortComments.map(comment => {
                    return(
                        <Comment key={comment._id} comment={comment} />
                    )
                })}
            </section>
        )
    }

    function SignIn() {
        return(
            <section className='comment-login'>
                <p>{'Log in to post comment. Or '}
                    <a href='/signup'>Sign Up</a>.
                </p>
            </section>
        )
    }

    return(
        <div className='commentContainer'>
            {isLoggedIn ? <CommentForm postId={postId} setComments={setComments} getCookie={getCookie} /> : <SignIn />}
            {!comments ? "No comments yet." : <CommentSection />}
        </div>
    )
}

export default Comment;