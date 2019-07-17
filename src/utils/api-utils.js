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

const postComment = async ({article_id, ...config}) => {
    const { data } = await axios.post(`${baseURL}/articles/${article_id}/comments`, {...config})
    return data
}

const deleteComment = async (comment_id) => {
    await axios.delete(`${baseURL}/comments/${comment_id}`)
} 

const patchVotes = async (voteType, id, inc_votes) => {
    await axios.patch(`${baseURL}/${voteType}/${id}`, { inc_votes })
}

export default { patchVotes, deleteComment, getTopics, getArticles, getArticleById, getComments, postComment }