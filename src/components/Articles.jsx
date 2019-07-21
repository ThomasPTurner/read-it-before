import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';
import '../styles/content.css'
import SortingQueries from './SortingQueries';
import PreviousNext from './PreviousNext';
import { Link } from '@reach/router';

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
                <Link to="/postarticle">
                    Post an article
                </Link>
                <SortingQueries p={p} applyQueries={this.applyQueries} otherSearchOptions={['comment_count']} />
                <main className='content'>
                    {articles.map((article) => (
                        <ArticleCard article={article} key={`${article.id}-card`} clickDelete={this.clickDelete} className='card'/>
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
    
    sliceArticles = (start, finish) => {
        this.setState(()=> {
            const { articles } = this.state
            return { articles: articles.slice(start, finish) }
        })
    }

    clickDelete = (event) => {
        event.preventDefault()
        const { target: {id} } = event
        const [removedArticle, index] = this.removeArticleFromState(id)
        API.deleteArticle(id)
        .catch(() => {
                this.setState(() => {
                    const { articles } = this.state
                    articles.splice(index, 0, removedArticle)
                    return { articles }
                })
            })
    }

    removeArticleFromState = (id) => {
        const { articles } = this.state
        let output = []
        articles.forEach(({id: article_id} , i)=> {
            if (+article_id === +id) {
                const [removedArticle] = articles.splice(i, 1)
                output = [removedArticle, i]
            }
            this.setState({
                articles
            })
        })
        return output
    }
}

export default Articles;