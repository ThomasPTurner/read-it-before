import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';
import '../styles/content.css'
import SortingQueries from './SortingQueries';

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true,
        sortBy: undefined,
        order: undefined,
        p: undefined,
        limit: undefined
    }

    render() {
        const { articles, isLoading } = this.state
        const list = this.getTopicsList()
        return ( isLoading ? <p>Loading...</p> 
            : 
            <div>
                <SortingQueries dropDownOptions={list} />
                <main className='content'>
                    {articles.map((article) => (
                        <ArticleCard article={article} key={`${article.id}-card`} className='card'/>
                    ))}
                </main>
            </div>
        );
    }
    componentDidMount() {
        this.fetchArticles()
        this.setState({ 
            isLoading: false
        })
    }
    componentDidUpdate({topic: prevTopic}, prevState) {
        const { topic } = this.props
        if (prevTopic !== topic) this.updateArticles(topic)
    }

    updateArticles = (...params) => {
        this.setState({
            isLoading: true
        })
        this.fetchArticles({params: {...params}})
        this.setState({
            isLoading: false
        })
    }

    fetchArticles = async (topic) => {
        const { articles } = await API.getArticles(topic)
        this.setState({
            articles
        })
    }
    getTopicsList = async () => {
        const topics = await API.getTopics()
        return topics
    }
}

export default Articles;