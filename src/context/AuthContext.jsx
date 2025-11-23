import { createContext, useContext } from "react";
import { useState, useEffect, useCallback } from "react";
import { RoutePath } from "@routes/routes";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const isAuthenticated = !!user;

    const fetchUser = useCallback(async () => {
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
    }, [refreshKey]);
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const refreshUser = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);