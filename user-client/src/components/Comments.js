import React from 'react';

const Comment = (props) => {
    const { comments } = props;

    function CommentSection() {
        return(
            <section className='comments'>
                {comments.map(comment => {
                    return(
                        <div className='comment' key={comment.id}>
                            <div className='CommentHeader'>
                                <span>{comment.user.username}</span>
                                <span>{comment.createdAt}</span>
                            </div>
                            <div className='commentText'>{comment.text}</div>
                        </div>
                    )
                })}
            </section>
        )
    }

    return(
        <section className='comments'>
            {console.log(comments)}
            {!comments ? "No comments yet." : <CommentSection />}

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