import React, { Component } from 'react';
import API from '../utils/api-utils';

class PostArticle extends Component {
    state = {
        posting: false,
        title: '',
        body: ''
    }
    render() {
        const { posting } = this.state
        return posting ?  
            <form>
                <label htmlFor="title">Title:</label>
                <input onChange={this.handleChange} type='text' id='title' />
                <label htmlFor="body">Body:</label>
                <input onChange={this.handleChange} type='text' id='body' />
                <button onClick={this.handleSubmit} type='submit'>Submit</button>
            </form> 
            : <button onClick={this.togglePostForm}>Post</button>;
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
        const { body, title } = this.state
        const { postedArticleToFront, sliceArticles } = this.props
        const [ topic ] = window.location.pathname.split('/').slice(-1)
        const author = 'happyamy2016'
        postedArticleToFront({ votes: 0, body, title, author, created_at: Date.now(), id: Date.now()})
        await API.postArticle({ topic, body, title, username: author, })
            .then (({article})=> {
                sliceArticles(1, 9)
                postedArticleToFront(article)
                this.setState({
                    title: '',
                    body: '',
                    posting: false
                })
                sliceArticles(0, 9)
            })
            .catch(()=> {
                sliceArticles(1,10)
                this.setState({
                    posting: true
                })
            })
    }

}

export default PostArticle;