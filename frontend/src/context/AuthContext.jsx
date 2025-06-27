import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function Authprovider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        const storedUsername = localStorage.getItem("username");

        if(storedAuth === "true" && storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "ログインに失敗しました");
            }

            const data = await res.json();

            setIsAuthenticated(true);
            setUsername(data.username);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("username", data.username);
        }
        catch(error) {
            alert(error.message);
        }
    };

    const logout = () => {
        setUsername('');
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}