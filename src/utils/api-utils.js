import axios from 'axios'

const baseURL = 'https://readitbefore.herokuapp.com/api'

const getTopics = async () => {
    const { data: { topics } } = await axios.get(`${baseURL}/topics`)
    return topics
}

const getArticles = async (config = {}) => {
    const { data } = await axios.get(baseURL + '/articles', {...config})
    return data
}

const getArticleById = async (config = {}) => {
    const { data } = await axios.get(`${baseURL}/articles/${config.id}`, {...config})
    return data
}

const getComments = async (config = {}) => {
    const { data } = await axios.get(`${baseURL}/articles/${config.article_id}/comments`, config)
    return data
}

export default { getTopics, getArticles, getArticleById, getComments }