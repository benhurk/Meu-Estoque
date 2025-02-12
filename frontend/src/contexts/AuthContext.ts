import { createContext } from 'react';

type AuthContextType = {
    accessToken: string | null;
    login: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    register: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
