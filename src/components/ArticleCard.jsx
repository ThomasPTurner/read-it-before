import React, { Component } from 'react';
import { Link } from '@reach/router';

class ArticleCard extends Component {
    render() {
        const { article: { title, body, votes, id }} = this.props
        return ( 
            <div className='card'>
                <Link to={`/articles/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <p>{body}</p>
                <p>{votes}</p>
            </div>
        );
    }
}

export default ArticleCard;