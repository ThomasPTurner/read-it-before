import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';
import '../styles/content.css'

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true
    }
    
    render() {
        const { articles, isLoading } = this.state
        return ( isLoading ? <p>Loading...</p> 
            : 
            <main className='content'>
                {articles.map((article) => (
                    <ArticleCard article={article} key={`${article.id}-card`} className='card'/>
                ))}
            </main>
        );
    }

    componentDidMount() {
        this.fetchArticles()
        this.setState({ 
            isLoading: false
        })
    }

    fetchArticles = async () => {
        const { articles } = await API.getArticles()
        this.setState({
            articles
        })
    }

}

export default Articles;