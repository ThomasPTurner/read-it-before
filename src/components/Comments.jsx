import React, { Component } from 'react';
import API from '../utils/api-utils';
import SortingQueries from './SortingQueries';
import CommentCard from './CommentCard';
import PreviousNext from './PreviousNext';
import PostComment from './PostComment'
import '../styles/comments.css'

class Comments extends Component {
    state = {
        comments: [],
        sort_by: undefined,
        order: undefined,
        p: 1,
        limit: 10,
        total_count: 0
    }
    render() {
        const { article_id } = this.props
        const { comments, p, total_count, limit } = this.state
        return (
            <div className="commentsContainer">
                <PostComment sliceComments={this.sliceComments} postedCommentToFront={this.postedCommentToFront} article_id={article_id} />
                <SortingQueries p={p} applyQueries={this.applyQueries} otherSearchOptions={[]}/>
                { comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} clickDelete={this.clickDelete} />
                ))}
                <PreviousNext p={p} max={total_count} turnPage={this.turnPage} limit={limit}/>
            </div>
        );
    }
    componentDidMount() {
        const { article_id } = this.props
        this.fetchComments({article_id})
    }

    componentDidUpdate(prevProps, {sort_by: prevSort_by, order: prevOrder, p: prevP, limit: prevLimit}) {
        let {sort_by, order, limit, p} = this.state
        if (sort_by !== prevSort_by || order !== prevOrder || p !== prevP || limit !== prevLimit) {
            if (p <= 0) p = 1
            this.updateComments({ sort_by, order, limit, p})
        }
    }
    
    fetchComments = (config) => {
        API.getComments(config)
            .then( ({comments, total_count}) => {
                this.setState({
                    total_count,
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
        const { comments: oldComments, total_count } = this.state
        let output = []
        this.setState(()=> {
            const comments = oldComments.filter(({id: comment_id}, i) => {
                if (+id === +comment_id) {
                    output = [oldComments[i], i]
                }
                return (+id !== +comment_id)
            })
            return { 
                comments,
                total_count: +total_count - 1
            } 
        })

        return output
    }
    
    postedCommentToFront = (comment) => {
        this.props.incrementComments()
        this.setState(() => {
            const { comments, total_count } = this.state
            return {
                total_count: +total_count + 1,
                comments: [comment, ...comments]
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