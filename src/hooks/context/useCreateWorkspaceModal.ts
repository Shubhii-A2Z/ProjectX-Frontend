import { useContext } from "react";

import { CreateWorskspaceContext } from "@/contexts/CreateWorkspaceContext";

export const useCreateWorkspaceModal=()=>{
    return useContext(CreateWorskspaceContext);
};