
import { useMutation } from "@tanstack/react-query";

import { createWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export interface CreateWorkspaceInput {
    name: string;
    description?: string;
}

interface CreateWorkspaceResponse {
    _id?: string;
    id?: string;
    name?: string;
    description?: string;
}

export const useCreateWorkspace = () => {
    const { auth } = useAuth();

    const mutation = useMutation<
        CreateWorkspaceResponse,
        Error,
        CreateWorkspaceInput
    >({
        mutationFn: async (data) => {
            if (!auth?.token) {
                throw new Error("Please sign in before creating a workspace.");
            }

            return createWorkspaceRequest({
                ...data,
                token: auth.token,
            });
        },
    });

    return {
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        createWorkspaceMutation: mutation.mutateAsync,
    };
};