import { createContext } from 'react';

type AuthContextType = {
    accessToken: string | null | undefined;
    login: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    guest: boolean;
    setGuest: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
