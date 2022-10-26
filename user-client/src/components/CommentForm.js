import React, { useEffect, useState } from "react";
import apis from "../api";

const CommentForm = (props) => {
    const { postId, setComments, getCookie } = props;
    const [ comment, setComment ] = useState({text: ''});

    function handleInput(e) {
        const input = e.target.value;

        setComment({text: input});
    }

    function handleSubmit(e) {
        e.preventDefault();

        let token = getCookie('jwt_token');

        apis.insertComment(postId, comment, token).then(() => {
            apis.getPostComments(postId).then(res => {
                setComments(res.data);
            });
            setComment({text: ''});
        });
    }

    return(
        <section className='commentForm'>
            <form action={`/posts/${postId}/comments`}>
                <label htmlFor='text'>
                    <textarea className='commentInput' name='text' value={comment.text} onChange={handleInput}></textarea>
                </label>
                <button stype='submit' onClick={handleSubmit}>Post</button>
            </form>
        </section>
    )
}

export default CommentForm;