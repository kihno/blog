import React from 'react';

const Home = (props) => {
    const { posts } = props;

    return(
        <main className='main'>
            <h1>Welcome to my blog!</h1>
            {posts && 
                posts.map(post => {
                    return(
                        <article className='post-card' key={post._id}>
                            <h3 className='post-card-title'>
                                <a href={'/posts/' + post._id}>{post.title}</a>
                            </h3>
                            <div className='byline'>
                                <span className='post-card-user'>
                                    <a href={'/users/' + post.user._id}>{post.user.username}</a>
                                </span>
                                <span className='post-card-time'>{post.createdAt}</span>
                            </div>
                            <p className='post-card-text'>{post.text}</p>
                        </article>
                    )
                })   
            }
        </main>
    )
}

export default Home;