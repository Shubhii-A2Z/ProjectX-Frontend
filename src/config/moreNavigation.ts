import agentsIcon from "@/assets/sidebar/agents-icon.png";
import appsIcon from "@/assets/sidebar/apps-icon.png";
import chatIcon from "@/assets/sidebar/chat-icon.png";
import homeIcon from "@/assets/sidebar/home-icon.png";

export interface MoreNavigationItem {
    id: string;
    label: string;
    description: string;
    path: string;
    icon: string;
}

export const MORE_NAVIGATION: MoreNavigationItem[] = [
    {
        id: "home",
        label: "Home",
        description: "Your Relay workspace",
        path: "/app/home",
        icon: homeIcon,
    },
    {
        id: "chat",
        label: "Chat",
        description: "Messages and conversations",
        path: "/app/chat",
        icon: chatIcon,
    },
    {
        id: "agents",
        label: "AI Agents",
        description: "AI-powered agents",
        path: "/app/agents",
        icon: agentsIcon,
    },
    {
        id: "apps",
        label: "Apps",
        description: "Connected applications",
        path: "/app/apps",
        icon: appsIcon,
    },
];