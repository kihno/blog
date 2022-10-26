import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns'
import apis from '../api';
import CommentForm from './CommentForm';

const Comment = (props) => {
    const { isLoggedIn, postId, getCookie } = props;

    const [comments, setComments] = useState(null);
    const [authUser, setAuthUser] = useState({});
    const [isHovering, setIsHovering] = useState(false);

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

    function handleMouseOver() {
        setIsHovering(true);
    }

    function handleMouseOut() {
        setIsHovering(false);
    }

    function Comment(props) {
        const { comment } = props;

        return(
           
            <div className='comment' key={comment._id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <div className='commentHeader'>
                    <span className='commentUser'><a href={'/users/' + comment.user._id}>{comment.user.username}</a></span>
                    <span className='commentTime'>{'- ' +formatDistanceToNow(new Date(comment.createdAt)) + ' ago'}</span>
                    {authUser.admin === 'true' || authUser.id == comment.user._id ? <button className={isHovering ? 'commentDelete' : 'hide'} onClick={() => deleteComment(comment._id)}>X</button> : null}
                </div>
                <span className='commentText'>{comment.text}</span>
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
            <div className='comments'>
                {sortComments.map(comment => {
                    return(
                        <Comment key={comment._id} comment={comment} />
                    )
                })}
            </div>
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