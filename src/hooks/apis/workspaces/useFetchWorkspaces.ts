
import { useQuery } from "@tanstack/react-query";

import { fetchWorkspacesRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export interface WorkspaceItem {
    _id?: string;
    id?: string;
    name: string;
    description?: string;
}

export const useFetchWorkspaces = () => {
    const { auth } = useAuth();

    const query = useQuery<WorkspaceItem[]>({
        queryKey: ["fetchWorkspaces"],
        queryFn: async () => {
            if (!auth?.token) {
                return [];
            }

            const response = await fetchWorkspacesRequest({
                token: auth.token,
            });

            // Accommodate either a direct array or a wrapped response.
            if (Array.isArray(response)) {
                return response;
            }

            if (Array.isArray(response?.workspaces)) {
                return response.workspaces;
            }

            return [];
        },
        enabled: Boolean(auth?.token),
        staleTime: 30_000,
    });

    return {
        workspaces: query.data ?? [],
        isLoading: query.isLoading,
        error: query.error,
        refetchWorkspaces: query.refetch,
    };
};