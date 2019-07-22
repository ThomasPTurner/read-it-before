import React, { Component } from 'react';
import API from '../utils/api-utils'
import { Link } from '@reach/router'
import '../styles/subHeadingContainer.css'
import '../styles/nav.css'
import CurrentUser from './CurrentUser';
import UserContext from './context/UserContext'

class Nav extends Component {
    state = {
        topics: []
    }
    render() {
        const { topics } = this.state
        const { changeTopic } = this.props
        return (
            <div className="subHeading">
                <nav className="nav">
                    <Link to={'/'} key='home-nav' onClick={()=>changeTopic(undefined)}>
                        <p className='navLink'>Home</ p>
                    </Link>
                    {topics.map(({ slug }) =>(
                        <Link to={`topics/${slug}`} onClick={()=>changeTopic(slug)} key={`${slug}-nav`}>
                            <p className='navLink'>{slug}</ p>
                        </Link>)
                    )}
                </nav>
                <CurrentUser user={this.context} className='userData'/>
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

Nav.contextType = UserContext;

export default Nav;