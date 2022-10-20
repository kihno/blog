import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

// function getCookie(name) {
//     const cookieArr = document.cookie.split(';');

//     for (let i=0; i < cookieArr.length; i++) {
//         let cookiePair = cookieArr[i].split('=');

//         if (name === cookiePair[0].trim()) {
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
//     return null;
// }

// let config = {
//     headers: {
//         Authorization: `Bearer ${getCookie('jwt_token')}`,
//     },
// }

// console.log(config);

export const getPostById = id => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get('/posts');
export const getPostComments = id => api.get(`/posts/${id}/comments`);
export const getCommentById = (postId, commentId) => api.get(`posts/${postId}/comments/${commentId}`);
export const insertComment = (id, payload, token) => api.post(`/posts/${id}/comments`, payload, { headers: { Authorization: `Bearer ${token}` } });
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);
export const getAllUsers = () => api.get('/users');
export const insertUser = (payload) => api.post('/users', payload);
export const login = user => api.post('/auth', user);

const apis = {
    getPostById,
    getAllPosts,
    getPostComments,
    getCommentById,
    insertComment,
    deleteComment,
    getAllUsers,
    insertUser,
    login
}

export default apis;