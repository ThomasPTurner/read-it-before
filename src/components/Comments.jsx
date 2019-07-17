import React, { Component } from 'react';
import API from '../utils/api-utils';
import SortingQueries from './SortingQueries';
import CommentCard from './CommentCard';
import PreviousNext from './PreviousNext';
import PostComment from './PostComment'

class Comments extends Component {
    state = {
        comments: [],
        sort_by: undefined,
        order: undefined,
        p: 1,
        limit: undefined
    }
    render() {
        const { article_id } = this.props
        const { comments, p } = this.state
        return (
            <div>
                <PostComment sliceComments={this.sliceComments} postedCommentToFront={this.postedCommentToFront} article_id={article_id} />
                <SortingQueries p={p} applyQueries={this.applyQueries}/>
                { comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} clickDelete={this.clickDelete} />
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

    
    clickDelete = (event) => {
        event.preventDefault()
        const { target: {id} } = event
        const [removedComment, index] = this.removeCommentFromState(id)
        this.props.incrementComments(-1)
        API.deleteComment(id)
        .catch(() => {
                this.setState(() => {
                    this.props.incrementComments()
                    const { comments } = this.state
                    comments.splice(index, 0, removedComment)
                    return { comments }
                })
            })
    }

    removeCommentFromState = (id) => {
        const { comments } = this.state
        let output = []
        comments.forEach(({id: comment_id} , i)=> {
            if (+comment_id === +id) {
                const [removedComment] = comments.splice(i, 1)
                output = [removedComment, i]
            }
            this.setState({
                comments
            })
        })
        return output
    }
    
    postedCommentToFront = (comment) => {
        this.props.incrementComments()
        this.setState(() => {
            const newComments = this.state.comments
            newComments.unshift(comment)
            return { 
                comment: newComments
            }
        })
    }
    
    sliceComments = (start, finish) => {
        this.setState(()=> {
            const { comments } = this.state
            return { comments: comments.slice(start, finish) }
        })
    }
}

export default Comments;