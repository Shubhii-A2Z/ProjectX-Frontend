
import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useMemo,
    useState,
} from "react";

interface CreateWorkspaceContextValue {
    openCreateWorkspaceModal: boolean;
    setOpenCreateWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateWorskspaceContext =
    createContext<CreateWorkspaceContextValue | null>(null);

interface CreateWorkspaceContextProviderProps {
    children: ReactNode;
}

export const CreateWorkspaceContextProvider = ({
    children,
}: CreateWorkspaceContextProviderProps) => {
    const [
        openCreateWorkspaceModal,
        setOpenCreateWorkspaceModal,
    ] = useState(false);

    const value = useMemo(
        () => ({
            openCreateWorkspaceModal,
            setOpenCreateWorkspaceModal,
        }),
        [openCreateWorkspaceModal]
    );

    return (
        <CreateWorskspaceContext.Provider value={value}>
            {children}
        </CreateWorskspaceContext.Provider>
    );
};