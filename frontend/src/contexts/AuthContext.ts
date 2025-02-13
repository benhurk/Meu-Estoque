import { createContext } from 'react';

type AuthContextType = {
    BASE_URL: string;
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    register: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
