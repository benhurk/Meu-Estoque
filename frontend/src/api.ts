import axios from 'axios';

export const URL = import.meta.env.DEV
    ? 'http://localhost:5000/api/'
    : import.meta.env.API_URL;

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
});

export default api;
