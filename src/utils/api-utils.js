import axios from 'axios'

const baseURL = 'https://readitbefore.herokuapp.com/api'

const getTopics = async () => {
    const { data: { topics } } = await axios.get(`${baseURL}/topics`)
    return topics
}

const getArticles = async (config = {}) => {
    const res = await axios.get({ 
        baseURL,
        URL: '/articles',
        ...config})
        console.log(res)
    return res.data
}

const getArticleById = async (id) => {
    const { data } = await axios.get(`${baseURL}/articles/${id}`)
    return data
}

export default { getTopics, getArticles, getArticleById }