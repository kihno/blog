import React from "react";

const CommentForm = (props) => {

    return(
        <section className='commentForm'>
            <form>
                <label for='text'>
                    <input type='text' name='text'></input>
                </label>
                <button stype='submit'></button>
            </form>
        </section>
    )
}

export default CommentForm;