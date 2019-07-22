import React, { Component } from 'react';
import API from '../utils/api-utils';
import '../styles/PostComment.css'
import UserContext from './context/UserContext';

class PostComment extends Component {
    state = {
        posting: false,
        commentBody: ''
    }
    render() {
        const { posting } = this.state
        return posting ?  
            <form className="commentPostDialogueContainer">
                <label className="commentBodyLabel" htmlFor="commentBody">Comment:</label>
                <textarea className="commentBodyInput" onChange={this.handleChange} type='text' id='commentBody' />
                <button className="postButton" onClick={this.handleSubmit} type='submit'>Submit</button>
            </form> 
            : <button className="postButton" onClick={this.togglePostForm}>Post a comment</button>;
    }
    
    togglePostForm = () => {
        const { posting } = this.state
        this.setState({
            posting: posting ? false : true
        })
    }

    handleChange = ({target: { value }}) => {
        this.setState({
            commentBody: value
        })
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        const { commentBody: body } = this.state
        const { article_id, postedCommentToFront, sliceComments } = this.props
        if (body !== '') {
            postedCommentToFront({ votes: 0, body, author: this.context, created_at: Date.now(), id: Date.now()})
            await API.postComment({ body, username: this.context, article_id})
                .then (({comment})=> {
                    sliceComments(1, 9)
                    postedCommentToFront(comment)
                    this.setState({
                        commentBody: '',
                        posting: false
                    })
                })
                .catch(()=> {
                    sliceComments(1,10)
                    this.setState({
                        posting: true
                    })
                })
        } 
    }

}

PostComment.contextType = UserContext;

export default PostComment;