import axios from 'axios';
import { cookies } from 'react-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

const credApi = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/'
});

let headers;
if (cookies) {
    headers = {
        headers: {
            'Authorization': `Bearer ${cookies.jwt_token}`,
        },
    }
};

export const getPostById = id => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get('/posts');
export const getPostComments = id => api.get(`/posts/${id}/comments`);
export const getCommentById = (postId, commentId) => api.get(`posts/${postId}/comments/${commentId}`);
export const insertComment = (id, payload) => credApi.post(`/posts/${id}/comments`, payload, headers);
export const deleteComment = (postId, commentId) => credApi.delete(`/posts/${postId}/comments/${commentId}`, headers);
export const getAllUsers = () => api.get('/users');
export const login = user => api.post('/auth', user);

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