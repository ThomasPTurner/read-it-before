import React, { Component } from 'react';
import API from '../utils/api-utils';
import Comments from './Comments';
import '../styles/article.css'
import Votes from './Votes';

class Article extends Component {
    state = {
        article: {},
        isLoading: true,
    }
    render() {
        const { isLoading, article: { title, body, id, comment_count, votes, author } } = this.state
        return isLoading ? <p>Loading...</p> : (
            <div>
                <h1 className="articleTitle" >{title}</h1> 
                {(author === 'happyamy2016') ? <button id={id} onClick={this.clickDelete}>Delete</button> : null}
                <Votes parentId={id} votes={votes} voteType="articles"/>
                <p className="articleBody" >{body}</p>
                <p>comments: {comment_count} </p>
                <Comments incrementComments={this.incrementComments} article_id={id}/>
            </div>
        );
    }
    componentDidMount() {
        this.fetchArticleById()
    }

    clickDelete = async (event) => {
        const { article: { id, topic }} = this.state
        event.preventDefault()
        await API.deleteArticle(id)
        window.location.href = `/topics/${topic}`
    }
    fetchArticleById = () => {
        const { article_id: id } = this.props
        API.getArticleById({id})
            .then(({article}) => {
                this.setState({
                    article,
                    isLoading: false
                })
            })
    }

    incrementComments = (num = 1) => {
        this.setState(()=>{
            const { article } = this.state
            article.comment_count=  +article.comment_count + +num
            return { article }
        })
    }
}

export default Article;