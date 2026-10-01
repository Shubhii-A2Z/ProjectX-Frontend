import {
    Bot,
    Box,
    Briefcase,
    CalendarDays,
    FileText,
    Folder,
    Hash,
    Home,
    type LucideIcon,
    MessageCircle,
    MessagesSquare,
    Settings,
    Sparkles,
    Users,
} from "lucide-react";

export type SidebarArea =
    | "home"
    | "chat"
    | "agents"
    | "apps";

export interface RailItem {
    id: SidebarArea;
    label: string;
    path: string;
    icon: LucideIcon;
}

export interface SidebarItem {
    id: string;
    label: string;
    icon?: LucideIcon;
    path?: string;
    badge?: string;
    unread?: number;
}

export interface SidebarSection {
    id: string;
    label: string;
    items: SidebarItem[];
}

export interface SidebarAreaData {
    title: string;
    subtitle: string;
    sections: SidebarSection[];
}

export interface Workspace {
    id: string;
    name: string;
    icon: string;
}

export const RAIL_ITEMS: RailItem[] = [
    {
        id: "home",
        label: "Home",
        path: "/app/home",
        icon: Home,
    },
    {
        id: "chat",
        label: "Chat",
        path: "/app/chat",
        icon: MessageCircle,
    },
    {
        id: "agents",
        label: "AI Agents",
        path: "/app/agents",
        icon: Bot,
    },
    {
        id: "apps",
        label: "Apps",
        path: "/app/apps",
        icon: Box,
    },
];

export const SETTINGS_ITEM = {
    id: "settings",
    label: "Settings",
    path: "/app/settings",
    icon: Settings,
};

export const WORKSPACES: Workspace[] = [
    {
        id: "relay",
        name: "Relay",
        icon: "R",
    },
    {
        id: "project-x",
        name: "Project X",
        icon: "P",
    },
    {
        id: "personal",
        name: "Personal",
        icon: "P",
    },
];

export const SIDEBAR_DATA: Record<
    SidebarArea,
    SidebarAreaData
> = {
    home: {
        title: "Home",
        subtitle: "Your workspace",
        sections: [
            {
                id: "favorites",
                label: "Favorites",
                items: [
                    {
                        id: "overview",
                        label: "Overview",
                        icon: Home,
                        path: "/app/home",
                    },
                    {
                        id: "my-work",
                        label: "My Work",
                        icon: Briefcase,
                        path: "/app/home/my-work",
                    },
                    {
                        id: "calendar",
                        label: "Calendar",
                        icon: CalendarDays,
                        path: "/app/home/calendar",
                    },
                ],
            },
            {
                id: "channels",
                label: "Channels",
                items: [
                    {
                        id: "engineering",
                        label: "engineering",
                        icon: Hash,
                        unread: 4,
                    },
                    {
                        id: "design",
                        label: "design",
                        icon: Hash,
                    },
                    {
                        id: "product",
                        label: "product",
                        icon: Hash,
                        unread: 2,
                    },
                ],
            },
            {
                id: "direct",
                label: "Direct Messages",
                items: [
                    {
                        id: "alex",
                        label: "Alex Morgan",
                        icon: Users,
                        unread: 1,
                    },
                    {
                        id: "sarah",
                        label: "Sarah Chen",
                        icon: Users,
                    },
                ],
            },
        ],
    },

    chat: {
        title: "Chat",
        subtitle: "Messages & conversations",
        sections: [
            {
                id: "channels",
                label: "Channels",
                items: [
                    {
                        id: "general",
                        label: "general",
                        icon: Hash,
                        unread: 3,
                    },
                    {
                        id: "engineering",
                        label: "engineering",
                        icon: Hash,
                    },
                    {
                        id: "random",
                        label: "random",
                        icon: Hash,
                    },
                ],
            },
            {
                id: "direct",
                label: "Direct Messages",
                items: [
                    {
                        id: "alex",
                        label: "Alex Morgan",
                        icon: Users,
                        unread: 2,
                    },
                    {
                        id: "maya",
                        label: "Maya Patel",
                        icon: Users,
                    },
                    {
                        id: "sam",
                        label: "Sam Wilson",
                        icon: Users,
                    },
                ],
            },
        ],
    },

    agents: {
        title: "AI Agents",
        subtitle: "Your intelligent teammates",
        sections: [
            {
                id: "agents",
                label: "My Agents",
                items: [
                    {
                        id: "relay-core",
                        label: "Relay Core",
                        icon: Sparkles,
                        badge: "AI",
                    },
                    {
                        id: "relay-coder",
                        label: "Relay Coder",
                        icon: Bot,
                    },
                    {
                        id: "relay-research",
                        label: "Relay Research",
                        icon: FileText,
                    },
                ],
            },
            {
                id: "recent",
                label: "Recent",
                items: [
                    {
                        id: "architecture",
                        label: "Architecture review",
                        icon: MessagesSquare,
                    },
                    {
                        id: "feature-planning",
                        label: "Feature planning",
                        icon: MessagesSquare,
                    },
                ],
            },
        ],
    },

    apps: {
        title: "Apps",
        subtitle: "Connected tools",
        sections: [
            {
                id: "connected",
                label: "Connected",
                items: [
                    {
                        id: "github",
                        label: "GitHub",
                        icon: Folder,
                    },
                    {
                        id: "notion",
                        label: "Notion",
                        icon: FileText,
                    },
                    {
                        id: "linear",
                        label: "Linear",
                        icon: Briefcase,
                    },
                ],
            },
            {
                id: "available",
                label: "Available",
                items: [
                    {
                        id: "google-drive",
                        label: "Google Drive",
                        icon: Folder,
                    },
                    {
                        id: "slack",
                        label: "Slack",
                        icon: MessageCircle,
                    },
                ],
            },
        ],
    },
};