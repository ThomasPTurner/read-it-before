import axios from 'axios'

const URL = 'https://readitbefore.herokuapp.com/api'

const getTopics = async () => {
    const { data: { topics } } = await axios.get(`${URL}/topics`)
    return topics
}

const getArticles = async (config = {}) => {
    const { data: { articles } } = await axios.get(`${URL}/articles`, config)
    return articles
}

const getArticleById = async (config = {}) => {
    const { data: { article } } = await axios.get(`${URL}/articles/`, config)
    console.log(article)
    return article
}

export default { getTopics, getArticles, getArticleById }