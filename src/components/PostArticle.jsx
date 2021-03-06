import React, { Component } from 'react';
import API from '../utils/api-utils';
import '../styles/PostArticles.css'
import UserContext from './context/UserContext';

class PostArticle extends Component {
    state = {
        title: '',
        body: '',
        topic: '',
        topics: [],
        badInput: false
    }
    render() {
        const { topics, badInput } = this.state 
        return (            
            <form className="postDialogueContainer">
                <label className="topicLabel" htmlFor="topic">Topic:</label>
                <select className="topicInput" onChange={this.handleChange} id='topic'>
                <option value="" disabled selected hidden>Select a topic</option>
                    {topics.map(({ slug }) =>(
                            <option key={`${slug}-option`} className='topicOption'>{slug}</ option>
                    ))}
                </select>
                <label className="titleLabel" htmlFor="title">Title:</label>
                <input className="titleInput" onChange={this.handleChange} type='text' id='title' />
                <label className="bodyLabel" htmlFor="body">Body:</label>
                <textarea className="bodyInput" onChange={this.handleChange} type='text' id='body' />
                <button className="postButton" onClick={this.handleSubmit} type='submit'>Submit</button>
                { badInput ? <p className="badInput">Please complete all fields</p> : null }
            </form>
        )
    }

    componentDidMount() {
        this.fetchTopics()
    }
    

    togglePostForm = () => {
        const { posting } = this.state
        this.setState({
            posting: posting ? false : true
        })
    }

    handleChange = ({target: { id, value }}) => {
        this.setState({
            [id]: value
        })
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        const { body, title, topic } = this.state
        if (body !== '' && title !== '' && topic !== '' && topic !== 'choose a topic...') {
            await API.postArticle({ topic, body, title, username: this.context })
                .then (async ({article: { id } })=> {
                    this.props.navigate(`/articles/${ id }`)
                })
        } else {
            this.setState({
                badInput: true
            })
        }
    }

    fetchTopics = async () => {
        const topics = await API.getTopics()
        this.setState({
            topics
        })
    }

}

PostArticle.contextType = UserContext;

export default PostArticle;