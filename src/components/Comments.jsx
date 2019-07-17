import React, { Component } from 'react';
import API from '../utils/api-utils';
import SortingQueries from './SortingQueries';
import CommentCard from './CommentCard';
import PreviousNext from './PreviousNext';

class Comments extends Component {
    state = {
        comments: [],
        sort_by: undefined,
        order: undefined,
        p: 1,
        limit: undefined
    }
    render() {
        const { comments, p } = this.state
        return (
            <div>
                <SortingQueries p={p} applyQueries={this.applyQueries}/>
                { comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
                <PreviousNext p={p} turnPage={this.turnPage}/>
            </div>
        );
    }
    componentDidMount() {
        const { article_id } = this.props
        this.fetchComments({article_id})
    }

    componentDidUpdate(prevProps, {sort_by: prevSort_by, order: prevOrder, p: prevP, limit: prevLimit}) {
        const {sort_by, order, limit, p} = this.state
        if (sort_by !== prevSort_by || order !== prevOrder || p !== prevP || limit !== prevLimit) {
            this.updateComments({ sort_by, order, limit, p})
        }
    }
    
    fetchComments = (config) => {
        API.getComments(config)
            .then( ({comments}) => {
                this.setState({
                    comments
                })
            } )
    }
    updateComments = ({...params}) => {
        const { article_id } = this.props
        this.fetchComments({article_id, params: {...params}})
    }

    applyQueries = (props) => {
        this.setState({
            ...props
        })
    }
    turnPage = ({target: { id }}) => {
        const { p } = this.state
        const refObj = {
            prev: () => this.setState({ p: p - 1 }),
            next: () => this.setState({ p: p + 1})
        }
        refObj[id]()
    }
}

export default Comments;