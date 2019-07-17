import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';

class ArticleCard extends Component {
    render() {
        const { article: { title, votes, id }} = this.props
        console.log(this.props)
        return ( 
            <div className='card'>
                <Link to={`/articles/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <Votes parentId={id} votes={votes} voteType="articles"/>
            </div>
        );
    }
}

export default ArticleCard;