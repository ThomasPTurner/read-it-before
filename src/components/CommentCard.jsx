import React from 'react';
import Votes from './Votes';

function CommentCard({clickDelete, comment: {id, author, body, votes}}) {
    return (
        <div>
            <h4>{author}</h4>
            <p>{body}</p>
            <Votes parentId={id} votes={votes} voteType="comments"/>
            {(author === 'happyamy2016') ? <button id={id} onClick={clickDelete}>Delete</button> : null}
        </div>
    );
}

export default CommentCard