import React, { Component } from 'react';
import API from '../utils/api-utils';

class PostComment extends Component {
    state = {
        posting: false,
        body: ''
    }
    render() {
        const { posting } = this.state
        return posting ?  
            <form>
                <label htmlFor="body">Comment:</label>
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
    handleChange = ({target: { value }}) => {
        this.setState({
            body: value
        })
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        const { body } = this.state
        const { article_id, postedCommentToFront, sliceComments } = this.props
        const author = 'happyamy2016'
        postedCommentToFront({ votes: 0, body, author, created_at: Date.now(), id: Date.now()})
        await API.postComment({ body, username: author, article_id})
            .then (()=> {
                this.setState({
                    body: '',
                    posting: false
                })
                sliceComments(0, 9)
            })
            .catch(()=> {
                sliceComments(1,10)
                this.setState({
                    posting: true
                })
            })
    }

}

export default PostComment;