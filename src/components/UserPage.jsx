import API from '../utils/api-utils'
import React, { Component } from 'react';
import Loading from './Loading';
import "../styles/UserPage.css"

class UserPage extends Component {
    state = {
        user: {},
        isLoading: true
    }
    render() {
        console.log(this.state.user)
        const { isLoading, user: { username, name, avatar_url, article_count, comment_count, comment_votes, article_votes }} = this.state
        return (
            isLoading ? 
                (<Loading />)
                :(
                    <div className="userPage content">
                        <img src={avatar_url} alt="userAvatar" className="userAvatar"></img>
                        <h3 className="username">{username}</h3>
                        <p className="name">{name}</p>
                        <div className="userStats">
                            <div className="statistic">
                                <label htmlFor="articleCount" className="statisticLabel">Posted Articles: </label>
                                <p className="statisticNumber" id="articleCount">{article_count}</p>
                            </div>
                            <div className="statistic">
                                <label htmlFor="commentCount" className="statisticLabel">Posted Comments: </label>
                                <p className="statisticNumber" id="commentCount">{comment_count}</p>
                            </div>
                            <div className="statistic">
                                <label htmlFor="commentVotes" className="statisticLabel">Total Comment Votes: </label>
                                <p className="statisticNumber" id="commentVotes">{comment_votes}</p>
                            </div>
                            <div className="statistic">
                                <label htmlFor="articleVotes" className="statisticLabel">Total Article Votes: </label>
                                <p className="statisticNumber" id="articleVotes">{article_votes}</p>
                            </div>
                        </div>
                    </div>
                )
        )};
    
    componentDidMount() {
       this.fetchUser()
    }

    fetchUser = () => {
        const { user_id, navigate } = this.props
        API.getUser(user_id)
            .then(({user}) => {
                this.setState({
                    user,
                    isLoading: false
                })
            })
            .catch(({response: {data}}) => {
                navigate(`/error`, { 
                    replace: true,
                    state: {
                        code: 404,
                        msg: 404
                    }
                })
            })
    }
}

export default UserPage;
