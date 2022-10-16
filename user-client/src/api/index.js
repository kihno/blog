import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

export const getPostById = id => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get('/posts');
export const getPostComments = id => api.get(`/posts/${id}/comments`);
export const getCommentById = (postId, commentId) => api.get(`posts/${postId}/comments/${commentId}`);
export const insertComment = (id, payload) => api.post(`/posts/${id}/comments`, payload);
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);
export const getAllUsers = () => api.get('/users');
export const login = payload => api.post('/auth', payload);

const apis = {
    getPostById,
    getAllPosts,
    getPostComments,
    getCommentById,
    insertComment,
    deleteComment,
    getAllUsers,
    login
}

export default apis;