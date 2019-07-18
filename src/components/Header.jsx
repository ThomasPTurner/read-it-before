import React from 'react';
import '../styles/heading.css'

function Header({ topic }) {
    return (
        <div className='headingContainer'>
            <h2 id="topicSubHeading" className='headings'>{topic}</h2>
        </div>
    );
}

export default Header