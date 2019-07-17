import React, { Component } from 'react';
import API from '../utils/api-utils';
import SortingQueries from './SortingQueries';

class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        const { comments } = this.state
        return (
            <div>
                <SortingQueries />
                { comments.map(({ body, id: comment_id }) => (
                    <p key={comment_id}>{body}</p>
                ))}
            </div>
        );
    }
    componentDidMount() {
        const { article_id } = this.props
        this.fetchComments(article_id)
    }

    fetchComments = (article_id) => {
        API.getComments({article_id})
            .then( ({comments}) => {
                this.setState({
                    comments
                })
            } )
    }
}

export default Comments;