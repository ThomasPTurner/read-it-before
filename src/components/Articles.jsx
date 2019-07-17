import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';
import '../styles/content.css'
import SortingQueries from './SortingQueries';
import PreviousNext from './PreviousNext';

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true,
        sort_by: undefined,
        order: undefined,
        p: 1,
        limit: undefined
    }

    render() {
        const { articles, isLoading, p } = this.state
        return ( isLoading ? <p>Loading...</p> 
            : 
            
            <div>
                <SortingQueries p={p} applyQueries={this.applyQueries} />
                <main className='content'>
                    {articles.map((article) => (
                        <ArticleCard article={article} key={`${article.id}-card`} className='card'/>
                    ))}
                </main>
                <PreviousNext turnPage={this.turnPage} p={p} />
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
        const { articles } = await API.getArticles(params)
        this.setState({
            articles
        })
    }

    applyQueries = (props) => {
        this.setState({
            ...props
        })
    }

    turnPage = ({target: { id }}) => {
        const { p } = this.state
        const refObj = {
            prev: () => this.setState({ p: p - 1 }),
            next: () => this.setState({ p: p + 1})
        }
        refObj[id]()
    }
}

export default Articles;