import agentsIcon from "@/assets/sidebar/agents-icon.png";
import appsIcon from "@/assets/sidebar/apps-icon.png";
import chatIcon from "@/assets/sidebar/chat-icon.png";
import homeIcon from "@/assets/sidebar/home-icon.png";
import settingsIcon from "@/assets/sidebar/settings-icon.png";

export interface AppNavigationItem {
    label: string;
    description: string;
    path: string;
    iconSrc: string;
}

export const RELAY_BRAND = {
    name: "Relay",
    aiName: "RelayAI",
    logo: "/assets/sidebar/relay-logo.png",
} as const;

// Keep the existing route paths.
// The PNG changes only the appearance of the navigation.
export const APP_NAVIGATION: AppNavigationItem[] = [
    {
        label: "Chat",
        description: "Team conversations",
        path: "/app/chat",
        iconSrc: chatIcon,
    },
    {
        label: "Agents",
        description: "RelayAI agents",
        path: "/app/agents",
        iconSrc: agentsIcon,
    },
];

export const APP_SETTINGS_NAVIGATION: AppNavigationItem = {
    label: "Settings",
    description: "App settings",
    path: "/app/settings",
    iconSrc: settingsIcon,
};

export const APP_EXTRA_NAVIGATION: AppNavigationItem[] = [
    {
        label: "Home",
        description: "Relay home",
        path: "/app/home",
        iconSrc: homeIcon,
    },
    {
        label: "Apps",
        description: "Connected apps",
        path: "/app/apps",
        iconSrc: appsIcon,
    },
];