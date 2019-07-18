import React, { Component } from 'react';
import API from '../utils/api-utils'
import { Link } from '@reach/router'
import '../styles/subHeadingContainer.css'
import '../styles/nav.css'
import CurrentUser from './CurrentUser';


class Nav extends Component {
    state = {
        topics: []
    }
    render() {
        const { topics } = this.state
        return (
            <div className="subHeading">
                <nav className="nav">
                    <Link className='navLink' to={'/'} key='home-nav' >
                        <p className='navLink'>Home</ p>
                    </Link>
                    {topics.map(({ slug }) =>(
                        <Link className='navLink' to={`topics/${slug}`} key={`${slug}-nav`}>
                            <p className='navLink'>{slug}</ p>
                        </Link>)
                    )}
                </nav>
                <CurrentUser />
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