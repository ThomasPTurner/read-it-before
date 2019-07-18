import React from 'react';
import Votes from './Votes';
import '../styles/CommentCard.css'

function CommentCard({clickDelete, comment: {id, author, body, votes}}) {
    return (
        <div className="commentCard card">
            <div className="commentHeading">
                <h4 className="commentAuthor">{author}</h4>
                {(author === 'happyamy2016') ? <button id={id} onClick={clickDelete}>Delete</button> : null}
            </div>
            <p className="body">{body}</p>
            <Votes parentId={id} votes={votes} voteType="comments"/>
        </div>
    );
}

export default CommentCard