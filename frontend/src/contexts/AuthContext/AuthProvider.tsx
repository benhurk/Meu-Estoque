import { ReactNode, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { InternalAxiosRequestConfig } from 'axios';

import api from '../../api';

import AuthContext from './AuthContext';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const userIsGuest = localStorage.getItem('guest-user') ? true : false;

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>();
    const [guest, setGuest] = useState<boolean>(userIsGuest);

    const navigate = useNavigate();

    const BASE_URL =
        import.meta.env.VITE_ENV === 'development'
            ? 'http://localhost:5000/api/auth'
            : '/api/auth/';

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use(
            (config) => {
                const customConfig = config as CustomAxiosRequestConfig;
                if (accessToken && !customConfig._retry) {
                    customConfig.headers.Authorization = `Bearer ${accessToken}`;
                }

                return customConfig;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => api.interceptors.request.eject(authInterceptor);
    }, [accessToken]);

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    try {
                        const res = await api.post('/auth/refresh-token');
                        setAccessToken(res.data.accessToken);

                        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                        originalRequest._retry = true;

                        return api(originalRequest);
                    } catch {
                        setAccessToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(refreshInterceptor);
    }, []);

    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, {
                username,
                password,
            });

            if (response.status === 201) {
                await login(username, password);
                navigate('/');
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data;
            }
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                {
                    username,
                    password,
                },
                { withCredentials: true }
            );

            if (guest) setGuest(false);
            localStorage.removeItem('guest-user');
            setAccessToken(response.data.accessToken);
            navigate('/');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data;
            }
        }
    };

    const logout = async () => {
        await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                register,
                login,
                logout,
                guest,
                setGuest,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
