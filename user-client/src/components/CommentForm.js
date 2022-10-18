import React, { useEffect, useState } from "react";
import apis from "../api";

const CommentForm = (props) => {
    const { postId, setComments } = props;
    const [ comment, setComment ] = useState({text: ''});

    function handleInput(e) {
        const input = e.target.value;

        setComment({text: input});
    }

    function handleSubmit(e) {
        e.preventDefault();
        setComment({text: ''});

        apis.insertComment(postId, comment).then(() => {
            apis.getPostComments(postId).then(res => {
                setComments(res.data);
            });
        });
    }

    return(
        <section className='commentForm'>
            <form action={`/posts/${postId}/comments`}>
                <label htmlFor='text'>
                    <input type='text' name='text' value={comment.text} onChange={handleInput}></input>
                </label>
                <button stype='submit' onClick={handleSubmit}>Post</button>
            </form>
        </section>
    )
}

export default CommentForm;