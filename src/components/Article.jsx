import React, { Component } from 'react';
import API from '../utils/api-utils';
import Comments from './Comments';
import '../styles/article.css'

class Article extends Component {
    state = {
        article: {},
        isLoading: true,
    }
    render() {
        const { isLoading, article: { title, body, id, comment_count } } = this.state
        return isLoading ? <p>Loading...</p> : (
            <div>
                <h1 className="articleTitle" >{title}</h1> 
                <p className="articleBody" >{body}</p>
                <p>comments: {comment_count} </p>
                <Comments article_id={id}/>
            </div>
        );
    }
    componentDidMount() {
        this.fetchArticleById()
    }
    
    fetchArticleById = () => {
        const { article_id: id } = this.props
        API.getArticleById({id})
            .then( ({article}) => {
                this.setState({
                    article,
                    isLoading: false
                })
            })
    }
}

export default Article;