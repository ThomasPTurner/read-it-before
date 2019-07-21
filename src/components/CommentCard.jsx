import React from 'react';
import Votes from './Votes';
import '../styles/CommentCard.css'
import utils from '../utils/utils'

function CommentCard({clickDelete, timeSince, comment: {id, author, body, votes, created_at}}) {
    return (
        <div className="commentCard card">
            <div className="commentHeading">
                <h4 className="commentAuthor">{author}</h4>
                {(author === 'happyamy2016') ? <button id={id} onClick={clickDelete}>Delete</button> : null}
            </div>
            <p className="body">{body}</p>
            <Votes parentId={id} votes={votes} voteType="comments"/>
            <p className="timeSince">{utils.timeSince(created_at)}</p>
        </div>
    );
}

export default CommentCard