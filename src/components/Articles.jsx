import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        const { articles } = this.state
        return (
            <div>
                <ul>
                    {articles.map(({id}) => (
                        <ArticleCard key={`${id}-card`} id={id} />
                    ))}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        this.fetchArticles()
    }
    fetchArticles = async () => {
        const { articles } = await API.getArticles()
        this.setState({
            articles
        })
    }
}

export default Articles;