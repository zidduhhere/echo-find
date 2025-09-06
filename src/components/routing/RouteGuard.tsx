import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RouteConfig } from '../../config/routes';

interface RouteGuardProps {
    route: RouteConfig;
    children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ route, children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    // Redirect to login if route requires authentication and user is not logged in
    if (route.requiresAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Redirect to home if route is for guests only and user is logged in
    if (route.requiresGuest && user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
