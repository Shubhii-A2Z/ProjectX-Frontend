import { createContext, useState } from "react";

export const CreateWorskspaceContext=createContext();

export const CreateWorkspaceContextProvider=({children})=>{

    const [openCreateWorkspaceModal, setOpenCreateWorkspaceModal]=useState(false);

    return (
        <CreateWorskspaceContext.Provider value={{openCreateWorkspaceModal, setOpenCreateWorkspaceModal}}>
            {children}
        </CreateWorskspaceContext.Provider>
    );
};