import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function Authprovider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (username, password) => {
        setUsername(username);
        setPassword(password);
        setIsAuthenticated(true);
    }

    const logout = () => {
        setUsername('');
        setPassword('');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, password, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}