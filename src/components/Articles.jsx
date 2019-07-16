import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';
import '../styles/content.css'
import SortingQueries from './SortingQueries';

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true,
        sort_by: undefined,
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
                <SortingQueries dropDownOptions={list} applyQueries={this.applyQueries} />
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
    componentDidUpdate({topic: prevTopic}, {sort_by: prevSort_by, order: prevOrder, p: prevP, limit: prevLimit}) {
        const { topic } = this.props
        const {sort_by, order, limit, p} = this.state
        if (prevTopic !== topic) this.updateArticles({topic})
        if (sort_by !== prevSort_by || order !== prevOrder || p !== prevP || limit !== prevLimit) {
            this.updateArticles({topic, sort_by, order, limit, p})
        }
    }

    updateArticles = ({...params}) => {
        this.setState({
            isLoading: true
        })
        this.fetchArticles({params: {...params}})
        this.setState({
            isLoading: false
        })
    }

    fetchArticles = async (params) => {
        console.log(params)
        const { articles } = await API.getArticles(params)
        this.setState({
            articles
        })
        console.log(this.state.articles)
    }
    getTopicsList = async () => {
        const topics = await API.getTopics()
        return topics
    }

    applyQueries = (props) => {
        this.setState({
            ...props
        })
    }
}

export default Articles;