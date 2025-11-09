import { Navigate, Outlet } from "react-router";
import { useAuth } from "@context/AuthContext";
const ProtectedRoute = ({requireAuth = true}) => {
    const { isAuthenticated, loading } = useAuth();
    if(loading){
        return <div>Loading...</div>
    }
    if(!isAuthenticated && requireAuth){
        return <Navigate to="/auth/login" replace />
    }
    if(isAuthenticated && !requireAuth){
        return <Navigate to="/" replace />
    }
    return <Outlet />;
}
export default ProtectedRoute;