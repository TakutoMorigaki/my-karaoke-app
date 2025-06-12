import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoute;