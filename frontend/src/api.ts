import axios from 'axios';

const URL =
    import.meta.env.VITE_ENV === 'development'
        ? 'http://localhost:5000/api/'
        : '/api/';

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
});

export default api;
