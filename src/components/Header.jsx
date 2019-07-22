import React from 'react';
import '../styles/heading.css'

function Header({ topic }) {
    return (
        <div className='headingContainer'>
            <h1 id="mainHeading" className="headings">Read-it before</h1>
            {topic ? <h2 id="topicSubHeading" className='headings'>{topic}</h2> : null }
        </div>
    );
}

export default Header