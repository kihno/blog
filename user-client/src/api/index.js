import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});


const token = document.cookie;

function getCookie(name) {
    const cookieArr = document.cookie.split(';');

    for (let i=0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split('=');

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

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



let config = {
    headers: {
        Authorization: `Bearer ${getCookie('jwt_token')}`,
    },
}

console.log(config);

export const getPostById = id => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get('/posts');
export const getPostComments = id => api.get(`/posts/${id}/comments`);
export const getCommentById = (postId, commentId) => api.get(`posts/${postId}/comments/${commentId}`);
export const insertComment = (id, payload) => api.post(`/posts/${id}/comments`, payload, config);
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`, config);
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