
import {
    createContext,
    type ReactNode,
    useEffect,
    useState,
} from "react";

interface AuthUser {
    username?: string;
    email?: string;
    avatar?: string;
    [key: string]: unknown;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
}

interface AuthContextValue {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps) => {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
    });

    useEffect(() => {
        try {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (user && token) {
                setAuth({
                    user: JSON.parse(user) as AuthUser,
                    token,
                    isLoading: false,
                });
            } else {
                setAuth({
                    user: null,
                    token: null,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error("Unable to restore authentication:", error);

            setAuth({
                user: null,
                token: null,
                isLoading: false,
            });
        }
    }, []);

    const logout = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setAuth({
            user: null,
            token: null,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};