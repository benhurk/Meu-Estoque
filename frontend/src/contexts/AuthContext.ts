import { createContext } from 'react';

type AuthContextType = {
    accessToken: string | null | undefined;
    setAccessToken: React.Dispatch<
        React.SetStateAction<string | null | undefined>
    >;
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
