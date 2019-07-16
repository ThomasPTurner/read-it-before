import React from 'react';
import '../styles/heading.css'

function Header({ topic }) {
    return (
        <div className='headingContainer'>
            <h1 id="mainHeading" className="headings">Read-it before</h1>
            <h2 id="topicSubHeading" className='headings'>{topic}</h2>
        </div>
    );
}

export default Header