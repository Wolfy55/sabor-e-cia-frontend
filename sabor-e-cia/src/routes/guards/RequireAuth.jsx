import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RequireAuth(){
    const { authenticated, loading } = useAuth()

    if(loading){
        return null
    }

    if(!authenticated){
        return <Navigate to='/login' replace/>
    }

    return <Outlet/>
}

export {RequireAuth}