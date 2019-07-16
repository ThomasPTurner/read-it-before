import React, { Component } from 'react';
import API from '../utils/api-utils'
import { Link } from '@reach/router'
import '../styles/subHeadingContainer.css'


class Nav extends Component {
    state = {
        topics: []
    }
    render() {
        const { topics } = this.state
        return (
            <div className="subHeading">
                <nav className="nav">
                    <Link to={'/'} key='home-nav' >
                        <p className='navLink'>Home</ p>
                    </Link>
                    {topics.map(({ slug }) =>(
                        <Link to={`topics/${slug}`} key={`${slug}-nav`}>
                            <p className='navLink'>{slug}</ p>
                        </Link>)
                    )}
                </nav>
                <p className="userData">A user</p>
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