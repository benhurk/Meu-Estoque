import axios from 'axios';
import { ReactNode, useState } from 'react';

import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const navigate = useNavigate();

    const BASE_URL = 'http://localhost:5000';

    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, {
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
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                username,
                password,
            });

            setAccessToken(response.data.accessToken);

            if (response.status === 200) {
                navigate('/');
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data;
            }
        }
    };

    const logout = async () => {
        setAccessToken(null);

        const response = await axios.post(
            `${BASE_URL}/api/auth/logout`,
            {},
            { withCredentials: true }
        );

        console.log(response);
    };

    const refreshToken = async () => {
        const response = await axios.post(
            `${BASE_URL}/api/auth/refresh-token`,
            {},
            {
                withCredentials: true,
            }
        );
        setAccessToken(response.data.accessToken);
    };

    return (
        <AuthContext.Provider
            value={{ accessToken, register, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
}
