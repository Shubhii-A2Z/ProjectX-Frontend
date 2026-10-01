import {
    Boxes,
    Compass,
    Download,
    FolderKanban,
    LayoutGrid,
    MessageCircle,
    Palette,
    Settings2,
    Sparkles,
    Terminal,
} from "lucide-react";

export type AppsNavigationItem = {
    id: string;
    label: string;
    icon: typeof LayoutGrid;
};

export type AppsNavigationSection = {
    id: string;
    label: string;
    items: AppsNavigationItem[];
};

export const APPS_NAVIGATION: AppsNavigationSection[] = [
    {
        id: "apps",
        label: "Apps",
        items: [
            {
                id: "overview",
                label: "Overview",
                icon: LayoutGrid,
            },
            {
                id: "connected",
                label: "Connected",
                icon: Boxes,
            },
            {
                id: "discover",
                label: "Discover",
                icon: Compass,
            },
        ],
    },
    {
        id: "categories",
        label: "Categories",
        items: [
            {
                id: "communication",
                label: "Communication",
                icon: MessageCircle,
            },
            {
                id: "development",
                label: "Development",
                icon: Terminal,
            },
            {
                id: "design",
                label: "Design",
                icon: Palette,
            },
            {
                id: "productivity",
                label: "Productivity",
                icon: FolderKanban,
            },
        ],
    },
    {
        id: "manage",
        label: "Manage",
        items: [
            {
                id: "installed",
                label: "Installed apps",
                icon: Download,
            },
            {
                id: "app-settings",
                label: "App settings",
                icon: Settings2,
            },
        ],
    },
];

export const APPS_SIDEBAR_FOOTER = {
    title: "Relay integrations",
    description: "Connect the tools your team already uses.",
    icon: Sparkles,
};