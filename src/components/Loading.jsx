import React from 'react';
import ReactLoading from 'react-loading'
import '../styles/Loading.css'

const Loading = () => (
    <div className="Loading">
        <h3>Loading...</h3>
        <ReactLoading className="spinningIcon" type={'spinningBubbles'} color={'blue'} height={300} width={300} />
    </div>
)

export default Loading;