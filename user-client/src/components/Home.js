import React from 'react';

const Home = (props) => {
    const { data } = props;

    return(
        <main className='main'>
            <h1>Welcome to my blog!</h1>
            <p>{!data ? 'Loading...' : data}</p>
        </main>
    )
}

export default Home;