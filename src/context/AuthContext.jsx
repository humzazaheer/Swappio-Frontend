import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { RoutePath } from "@routes/routes";



const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}${RoutePath.USER}/${RoutePath.PROFILE}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error("Not authenticated");
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);
