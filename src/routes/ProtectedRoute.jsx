import { Navigate, Outlet } from "react-router";
import { useAuth } from "@context/AuthContext";
const ProtectedRoute = ({requireAuth = true, requiredRole}) => {
    const { isAuthenticated, loading, user } = useAuth();
    if(loading){
        return <div>Loading...</div>
    }
    if(!isAuthenticated && requireAuth){
        return <Navigate to="/auth/login" replace />
    }
    if (requiredRole && isAuthenticated) {
        if (user?.role !== requiredRole) {
            console.warn(`User role '${user?.role}' denied access to restricted route.`);
            
            return <Navigate to="/" replace />; 
        }
    }
    if (isAuthenticated && !requiredRole && !requireAuth) {
            return <Navigate to="/" replace />; 
    }
    return <Outlet />;
}
export default ProtectedRoute;