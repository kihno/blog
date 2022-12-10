import React, { useEffect } from 'react';
import { format } from 'date-fns'

const Home = (props) => {
    const { posts } = props;

    useEffect(() => {
        console.log(posts);
      }, [posts]);

    function PostLayout() {
        return(
            <section className='posts'>
                {posts.map(post => {
                    return(
                        <article className='post-card' key={post._id}>
                            <h3 className='post-card-title'>
                                <a href={'/posts/' + post._id}>{post.title}</a>
                            </h3>
                            <div className='byline'>
                                <span className='post-card-user'>
                                    <a href={'/users/' + post.user._id}>{post.user.username}</a>
                                </span>
                                <span className='post-card-time'>{' - ' + format(new Date(post.createdAt), 'PP')}</span>
                            </div>
                        </article>
                    )
                })}
            </section>
        )
    }

    return(
        <main className='main'>
            <h1>Welcome to my blog!</h1>
            {!posts ? 'Loading...' : <PostLayout /> }
        </main>
    )
}

export default Home;