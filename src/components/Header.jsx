import React from 'react';
import TopicHeader from './TopicHeader';
import { Router } from '@reach/router';

function Header(props) {
    return (
        <div className="heading">
            <h1>Read-it before</h1>
            <Router >
                <TopicHeader path="/topics/:topic_id" currentTopic="football"/>
            </Router>
        </div>
    );
}

export default Header