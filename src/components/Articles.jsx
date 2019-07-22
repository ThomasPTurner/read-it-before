import React, { Component } from 'react';
import API from '../utils/api-utils'
import ArticleCard from './ArticleCard';
import '../styles/content.css'
import SortingQueries from './SortingQueries';
import PreviousNext from './PreviousNext';
import { Link } from '@reach/router';
import Loading from './Loading';


class Articles extends Component {

    state = {
        articles: [],
        isLoading: true,
        sort_by: undefined,
        order: undefined,
        p: 1,
        limit: 10,
        total_count: 0
    }

    render() {
        const { articles, isLoading, p, limit, total_count } = this.state
        return ( isLoading ? <Loading />
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
                <PreviousNext limit={limit} max={total_count} turnPage={this.turnPage} p={p} />
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles()
        this.checkForBadTopic()
    }

    componentDidUpdate({topic: prevTopic}, {sort_by: prevSort_by, order: prevOrder, p: prevP, limit: prevLimit}) {
        const { topic } = this.props
        const {sort_by, order, limit, p} = this.state
        if (prevTopic !== topic) {
            this.updateArticles({topic})
        }
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
        this.setState({
            isLoading: true
        })
        const { articles, total_count } = await API.getArticles(params)
        this.setState({
            articles,
            total_count,
            isLoading: false
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
                    const { articles, total_count } = this.state
                    articles.splice(index, 0, removedArticle)
                    return { 
                        articles,
                        total_count: +total_count - 1 
                    }
                })
            })
    }

    removeArticleFromState = (id) => {
        const { articles: oldArticles } = this.state
        let output = []
        this.setState(()=> {
            const articles = oldArticles.filter(({id: article_id}, i) => {
                if (+id === +article_id) {
                    output = [oldArticles[i], i]
                }
                return (+id !== +article_id)
            })
            return { articles } 
        })

        return output
    }

    checkForBadTopic = async ()=> {
        const { topic, navigate } = this.props
        console.log(this.props.topic)
        if (topic) {
            const topicsObjects = await API.getTopics()
            const topicsArray = topicsObjects.map(({slug}) => slug)
            if (topicsArray.includes(topic)) {
                navigate(`/error`, { 
                    replace: true,
                    state: {
                        code: 404,
                        msg: 'Topic not found'
                    }
                })  
            }
        } 
    }
}


export default Articles;