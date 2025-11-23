import { Navigate, Outlet } from "react-router";
import { useAuth } from "@context/AuthContext";
import Loading from "@components/Loading";
const ProtectedRoute = ({ requireAuth = true }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <Loading />
    }
    if (!isAuthenticated && requireAuth) {
        return <Navigate to="/auth/login" replace />
    }
    if (isAuthenticated && !requireAuth) {
        return <Navigate to="/" replace />
    }
    return <Outlet />;
}
export default ProtectedRoute;