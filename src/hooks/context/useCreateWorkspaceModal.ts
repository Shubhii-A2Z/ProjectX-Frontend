
import { useContext } from "react";

import { CreateWorskspaceContext } from "@/contexts/CreateWorkspaceContext";

export const useCreateWorkspaceModal = () => {
    const context = useContext(CreateWorskspaceContext);

    if (!context) {
        throw new Error(
            "useCreateWorkspaceModal must be used within CreateWorkspaceContextProvider"
        );
    }

    return context;
};