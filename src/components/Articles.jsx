import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true
    }
    render() {
        const { articles, isLoading } = this.state
        return ( isLoading ? <p>Loading...</p> 
            : 
            <div>
                <ul className='content'>
                    {articles.map((article) => (
                        <ArticleCard article={article} key={`${article.id}-card`}/>
                    ))}
                </ul>
            </div>
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