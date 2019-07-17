import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';

class ArticleCard extends Component {
    render() {
        const { clickDelete, article: { title, votes, id, author }} = this.props
        return ( 
            <div className='card'>
                <Link to={`/articles/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <Votes parentId={id} votes={votes} voteType="articles"/>
                {(author === 'happyamy2016') ? <button id={id} onClick={clickDelete}>Delete</button> : null}
            </div>
        );
    }
}

export default ArticleCard;