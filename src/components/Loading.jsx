import React from 'react';
import ReactLoading from 'react-loading'
import '../styles/Loading.css'

const Loading = () => (
    <div className="Loading">
        <h3>Loading...</h3>
        <ReactLoading className="spinningIcon" type={'spinningBubbles'} color={'blue'} height={667} width={375} />
    </div>
)

export default Loading;