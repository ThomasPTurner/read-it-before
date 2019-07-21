import React, { Component } from 'react';
import API from '../utils/api-utils';
import Comments from './Comments';
import '../styles/Article.css'
import Votes from './Votes';
import utils from '../utils/utils'

class Article extends Component {
    state = {
        article: {},
        isLoading: true,
    }
    render() {
        const { isLoading, article: { title, body, id, votes, author, created_at } } = this.state
        return isLoading ? <p>Loading...</p> : (
            <div >
                <div className="article">
                    <div className="articleHeading">
                        <h1 className="articleTitle" >{title}</h1>
                        {(author === 'happyamy2016') ? <button className="articleDeleteButton" id={id} onClick={this.clickDelete}>Delete</button> : null}
                        <p className="timeSince">{utils.timeSince(created_at)}</p>
                    </div>
                    <Votes className="articleVotes" parentId={id} votes={votes} voteType="articles"/>
                    <p className="articleBody" >{body}</p>
                </div>
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
            .catch(()=> {
                window.location.href = `/error`
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