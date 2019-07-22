import React, { Component } from 'react';
import API from '../utils/api-utils';
import '../styles/PostArticles.css'

class PostArticle extends Component {
    state = {
        title: '',
        body: '',
        topic: '',
        topics: []
    }
    render() {
        const { topics } = this.state 
        return (            
            <form className="postDialogueContainer">
                <label className="topicLabel" htmlFor="topic">Topic:</label>
                <select placeholder="choose a topic..." className="topicInput" onChange={this.handleChange} id='topic'>
                    <option className='topicOption' key="default-option">choose a topic....</option>
                    {topics.map(({ slug }) =>(
                            <option key={`${slug}-option`} className='topicOption'>{slug}</ option>
                    ))}
                </select>
                <label className="titleLabel" htmlFor="title">Title:</label>
                <input className="titleInput" onChange={this.handleChange} type='text' id='title' />
                <label className="bodyLabel" htmlFor="body">Body:</label>
                <input className="bodyInput" onChange={this.handleChange} type='text' id='body' />
                <button className="postButton" onClick={this.handleSubmit} type='submit'>Submit</button>
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
        const author = 'happyamy2016'
        if (body !== '' && title !== '' && topic !== '' && topic !== 'choose a topic...') {
            await API.postArticle({ topic, body, title, username: author, })
                .then (async ({article: { id } })=> {
                    this.props.navigate(`/articles/${ id }`)
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

export default PostArticle;