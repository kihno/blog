import React, { useEffect, useState } from "react";
import apis from "../api";

const CommentForm = (props) => {
    const { postId } = props;
    const [ comment, setComment ] = useState('');

    function handleInput(e) {
        const input = e.target.value;

        setComment(input);
    }

    function handleSubmit(e) {
        e.preventDefault();

        apis.insertComment(postId, comment);
    }

    return(
        <section className='commentForm'>
            <form action={`/posts/${postId}/comments`}>
                <label htmlFor='text'>
                    <input type='text' name='text' value={comment} onChange={handleInput}></input>
                </label>
                <button stype='submit' onClick={handleSubmit}>Post</button>
            </form>
        </section>
    )
}

export default CommentForm;