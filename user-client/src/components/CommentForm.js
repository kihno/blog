import React, { useEffect, useState } from "react";
import apis from "../api";

const CommentForm = (props) => {
    const { postId, setComments, getCookie } = props;
    const [ comment, setComment ] = useState({text: ''});
    const [error, setError] = useState({valid: false, message: 'Please enter comment before posting.'});
    const [hide, setHide] = useState(true);

    function handleInput(e) {
        const input = e.target.value;

        setComment({text: input});

        if (input.length > 0) {
            setError({...error, valid: true});
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!error.valid) {
            setHide(false);
        } else {
            setHide(true);
            
            let token = getCookie('jwt_token');

            apis.insertComment(postId, comment, token).then(() => {
                apis.getPostComments(postId).then(res => {
                    setComments(res.data);
                });
                setComment({text: ''});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return(
        <section className='commentForm'>
            <form action={`/posts/${postId}/comments`}>
                <label htmlFor='text'>
                    <textarea className='commentInput' name='text' value={comment.text} onChange={handleInput}></textarea>
                </label>
                <div className={hide ? 'hide error' : 'error'}>{error.message}</div>
                <button stype='submit' onClick={handleSubmit}>Post</button>
            </form>
        </section>
    )
}

export default CommentForm;