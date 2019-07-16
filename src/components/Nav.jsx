import React, { Component } from 'react';
import API from '../utils/api-utils'
import { Link } from '@reach/router'
import '../styles/nav.css'


class Nav extends Component {
    state = {
        topics: []
    }
    render() {
        const { topics } = this.state
        return (
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