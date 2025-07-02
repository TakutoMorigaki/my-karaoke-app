import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
    const {isAuthenticated, isLoading} = useAuth();
    
    if(isLoading) return <div>Now Loading...</div>;
    if(!isAuthenticated) return <Navigate to='/' />;
    
    return <Outlet />;
}

export default ProtectedRoute;