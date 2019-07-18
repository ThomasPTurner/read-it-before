import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';
import '../styles/ArticleCard.css'

class ArticleCard extends Component {
    render() {
        const { clickDelete, article: { title, votes, id, author }} = this.props
        return ( 
            <div className='card articleCard'>
                <Link className="articleTitle" to={`/articles/${id}`}>
                    <h3 className="articleTitle">{title}</h3>
                </Link>
                <Votes classname="votes" parentId={id} votes={votes} voteType="articles"/>
                <div className="information">
                    <p className="author" >{author}</p>
                    {(author === 'happyamy2016') ? <button id={id} onClick={clickDelete}>Delete</button> : null}
                </div>
            </div>
        );
    }
}

export default ArticleCard;