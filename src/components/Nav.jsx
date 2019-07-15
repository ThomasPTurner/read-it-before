import React, { Component } from 'react';
import API from '../utils/api-utils'
import { Link } from '@reach/router'


class Nav extends Component {
    state = {
        topics: []
    }
    render() {
        const { topics } = this.state
        return (
            <div>
                {topics.map(({ slug })=>(
                    <Link to={`topics/${slug}`} key={`${slug}-nav`}>
                        <p>{slug}</p>
                    </Link> )
                )}
            </div>
        );
    }
    componentDidMount() {
        this.fetchTopics()
    }
    fetchTopics = async () => {
        const topics = await API.getTopics()
        this.setState({
            topics
        })
    }
}

export default Nav;