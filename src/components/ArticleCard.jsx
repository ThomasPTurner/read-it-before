import React, { Component } from 'react';

class ArticleCard extends Component {
    render() {
        const { article: { title, body, votes }} = this.props
        return ( 
            <div className='card'>
               <h3>{title}</h3>
               <p>{body}</p>
               <p>{votes}</p>
            </div>
        );
    }
}

export default ArticleCard;