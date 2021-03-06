import React, { Component } from 'react';
import API from '../utils/api-utils';
import Comments from './Comments';
import '../styles/Article.css'
import Votes from './Votes';
import utils from '../utils/utils'
import UserContext from './context/UserContext';
import Loading from './Loading';
import { Link } from '@reach/router';

class Article extends Component {
    state = {
        article: {},
        isLoading: true,
    }

    render() {
        const { isLoading, article: { title, body, id, votes, author, created_at } } = this.state
        return isLoading ? <Loading /> : (
            <div className="content">
                <div className="article">
                    <Link to={`/users/${author}`}>
                        <p className="articleAuthor">{`${author}`}</p>
                    </Link>
                    <p className="timeSince">{utils.timeSince(created_at)}</p>
                    <div className="articleHeading">
                        <h1 className="articleTitle" >{title}</h1>
                    </div>
                    <Votes className="articleVotes" parentId={id} votes={votes} voteType="articles"/>
                    <p className="articleBody" >{body}</p>
                </div>
                {(author === this.context) ? <button className="articleDeleteButton" id={id} onClick={this.clickDelete}>Delete</button> : null}
                <Comments incrementComments={this.incrementComments} article_id={id}/>
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticleById()
    }

    clickDelete = async (event) => {
        const { article: { id, topic }} = this.state
        await API.deleteArticle(id)
        this.props.navigate(`/topics/${topic}`, {
            replace: true
        })
    }

    fetchArticleById = () => {
        const { article_id: id, changeTopic, navigate } = this.props
        API.getArticleById({id})
            .then(({article}) => {
                changeTopic(article.topic)
                this.setState({
                    article,
                    isLoading: false
                })
            })
            .catch(({response: {data: {code, msg}}})=> {
                navigate(`/error`, { 
                    replace: true,
                    state: {
                        code,
                        msg
                    }
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

Article.contextType = UserContext

export default Article;