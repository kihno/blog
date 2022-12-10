import axios from 'axios';

const api = axios.create({
    baseURL: 'https://blog-h854.onrender.com',
});

export const getPostById = id => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get('/posts');
export const getPostComments = id => api.get(`/posts/${id}/comments`);
export const getCommentById = (postId, commentId) => api.get(`posts/${postId}/comments/${commentId}`);
export const insertComment = (id, payload, token) => api.post(`/posts/${id}/comments`, payload, { headers: { Authorization: `Bearer ${token}` } });
export const deleteComment = (postId, commentId, token) => api.delete(`/posts/${postId}/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
export const getAllUsers = () => api.get('/users');
export const getUserById = id => api.get(`/users/${id}`);
export const insertUser = (payload) => api.post('/users', payload);
export const updateUser = (payload, userId, token) => api.patch(`/users/${userId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
export const login = user => api.post('/auth', user);

const apis = {
    getPostById,
    getAllPosts,
    getPostComments,
    getCommentById,
    insertComment,
    deleteComment,
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    login
}

export default apis;