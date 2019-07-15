import React, { Component } from 'react';
import API from '../utils/api-utils';

class ArticleCard extends Component {
    state= {
        article: {}
    }
    render() {
        const { article: { title, body, votes } } = this.state
        return (
            <div>
               <h3>{title}</h3>
               <p>{body}</p>
               <p>{votes}</p>
            </div>
        );
    }
    componentDidMount() {
        this.fetchArticleById(this.props.id)
    }
    
    fetchArticleById = async (id) => {
        const { article } = await API.getArticleById(id)
        this.setState({
            article
        })
    }
}

export default ArticleCard;