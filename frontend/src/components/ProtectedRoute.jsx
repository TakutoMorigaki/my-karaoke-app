import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const {isAuthenticated, isLoading} = useAuth();
    console.log(isAuthenticated);

    if(isLoading){
        return <div>Now Loading...</div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoute;