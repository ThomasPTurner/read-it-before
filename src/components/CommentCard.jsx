import React from 'react';

function CommentCard({comment: {author, body, votes}}) {
    return (
        <div>
            <h4>{author}</h4>
            <p>{body}</p>
            <p>{votes}</p>
        </div>
    );
}

export default CommentCard