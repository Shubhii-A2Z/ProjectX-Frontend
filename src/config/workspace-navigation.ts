
import {
    Bot,
    type LucideIcon,
    MessageSquare,
    Settings,
    Users,
} from "lucide-react";

export interface WorkspaceNavigationItem {
    id: string;
    label: string;
    path: string;
    icon: LucideIcon;
    description: string;
}

export const WORKSPACE_NAVIGATION: WorkspaceNavigationItem[] = [
    {
        id: "chat",
        label: "Chat",
        path: "/app/chat",
        icon: MessageSquare,
        description: "Messages and conversations",
    },
    {
        id: "agents",
        label: "Agents",
        path: "/app/agents",
        icon: Bot,
        description: "AI agents and assistants",
    },
    {
        id: "team",
        label: "Team",
        path: "/app/team",
        icon: Users,
        description: "Workspace members",
    },
];

export const WORKSPACE_ACCOUNT_NAVIGATION = {
    settings: {
        label: "Settings",
        path: "/app/settings",
        icon: Settings,
    },
} as const;

export const WORKSPACE_UI_CONFIG = {
    railWidth: 72,
    sidebarMinWidth: 240,
    sidebarMaxWidth: 420,
    sidebarDefaultWidth: 280,
    workspaceNameMaxLength: 50,
    workspaceDescriptionMaxLength: 250,
} as const;

export const WORKSPACE_MODAL_COPY = {
    title: "Create a workspace",
    description:
        "Bring your team, conversations, and projects together in one place.",
    nameLabel: "Workspace name",
    namePlaceholder: "e.g. Product Team",
    descriptionLabel: "Description (optional)",
    descriptionPlaceholder: "What will your team use this workspace for?",
    cancel: "Cancel",
    submit: "Create workspace",
    submitting: "Creating workspace...",
} as const;