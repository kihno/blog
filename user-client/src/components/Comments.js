import React from 'react';

const Comment = (props) => {
    const { comments } = props;

    return(
        <section className='comments'>
            {!comments ? "No comments yet." : comments}

            {/* {comments.map(comment => {
                return <article className='comment'>
                    <h4 className='commentUser'>{comment.user}</h4>
                    <p className='commentTime'>{comment.createdAt}</p>
                    <p className='commentText'>{comment.text}</p>
                </article>
            })} */}
        </section>
    )
}

export default Comment;