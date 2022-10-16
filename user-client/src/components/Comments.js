import React from 'react';
import { format } from 'date-fns'

const Comment = (props) => {
    const { comments } = props;

    function CommentSection() {
        return(
            <section className='comments'>
                {comments.map(comment => {
                    return(
                        <div className='comment' key={comment.id}>
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

    return(
        <section className='comments'>
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