import React from 'react';
import Votes from './Votes';
import '../styles/CommentCard.css'
import utils from '../utils/utils'
import UserContext from './context/UserContext'
import { Link } from '@reach/router';

function CommentCard({clickDelete, timeSince, comment: {id, author, body, votes, created_at}}) {
    return (
        <div className="commentCard card">
            <div className="commentHeading">
                <Link className="commentAuthor" to={`/users/${author}`}>
                    <h4 className="commentAuthor">{author}</h4>
                </Link>
                <UserContext.Consumer>
                    {user => (
                        (user === author) ? <button id={id} onClick={clickDelete}>Delete</button> : null
                    )}
                </UserContext.Consumer>
            </div>
            <p className="body">{body}</p>
            <Votes parentId={id} votes={votes} voteType="comments"/>
            <p className="timeSince">{utils.timeSince(created_at)}</p>
        </div>
    );
}

export default CommentCard