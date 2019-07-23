import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';
import '../styles/ArticleCard.css'
import utils from '../utils/utils'
import UserContext from './context/UserContext'

class ArticleCard extends Component {
    render() {
        const { article: { title, votes, id, author, comment_count, created_at}} = this.props
        return ( 
            <div className='card articleCard'>
                <Link className="articleTitle" to={`/articles/${id}`}>
                    <h3 className="articleTitle">{title}</h3>
                </Link>
                <Votes className="votes" parentId={id} votes={votes} voteType="articles"/>
                <div className="information">
                    <p className="author" >{author}</p>
                    <p className="commentCount">{`Comments: ${comment_count}`}</p>
                    <p className="timeSince">{utils.timeSince(created_at)}</p>
                </div>
            </div>
        );
    }
}

ArticleCard.contextType = UserContext

export default ArticleCard;