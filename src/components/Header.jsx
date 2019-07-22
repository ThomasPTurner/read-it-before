import React from 'react';
import '../styles/heading.css';
import TopicContext from './context/TopicContext';

function Header() {
    return (
        <div className='headingContainer'>
            <h1 id="mainHeading" className="headings">Read-it before</h1>
            <TopicContext.Consumer>
                {topic => {
                    return topic ? <h2 id="topicSubHeading" className='headings'>{topic}</h2> : null 
                }}
            </TopicContext.Consumer>
        </div>
    );
}

export default Header