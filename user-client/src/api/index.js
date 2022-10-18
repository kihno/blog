import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

// const credApi = axios.create({
//     withCredentials: true,
//     baseURL: 'http://localhost:8080/',
// });

// let config;
// if (cookies) {
//     config = {
//         headers: {
//             Authorization: `Bearer ${cookies.jwt_token}`
//         },
//     }
// }



// let config;
// if (cookies) {

//     config = {
//         headers: {
//             Authorization: `Bearer ${cookies.jwt_token}`,
//         },
//     }
// };

export const getPostById = id => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get('/posts');
export const getPostComments = id => api.get(`/posts/${id}/comments`);
export const getCommentById = (postId, commentId) => api.get(`posts/${postId}/comments/${commentId}`);
export const insertComment = (id, payload) => api.post(`/posts/${id}/comments`, payload);
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);
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