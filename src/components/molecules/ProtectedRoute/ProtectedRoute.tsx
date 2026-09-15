import { Navigate } from "react-router-dom";

import { RelayLoading } from "@/components/organisms/loading/RelayLoading";
import { useAuth } from "@/hooks/context/useAuth";

export const ProtectedRoute=({children})=>{
    const {auth}=useAuth();

    if(auth.isLoading){
        return <RelayLoading/>;
    }

    if(!auth.user || !auth.token){
        return <Navigate to={"/auth/signin"} />;
    }

    return children;
};