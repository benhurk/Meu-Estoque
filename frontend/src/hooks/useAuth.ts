import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const authApi = axios.create({
        baseURL: context.BASE_URL,
        withCredentials: true,
    });

    authApi.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await authApi.post('/refresh-token');
                    const newAccessToken = res.data.accessToken;
                    context.setAccessToken(newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return authApi(originalRequest);
                } catch (refreshError) {
                    context.setAccessToken(null);
                    navigate('/signin');

                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return { context, authApi };
}
