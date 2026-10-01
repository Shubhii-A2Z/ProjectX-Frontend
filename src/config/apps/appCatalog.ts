export type AppCategory =
    | "Communication"
    | "Development"
    | "Design"
    | "Productivity"
    | "Storage";

export type RelayApp = {
    id: string;
    name: string;
    description: string;
    category: AppCategory;
    initials: string;
    iconClassName: string;
    popular?: boolean;
    connected?: boolean;
    users: string;
};

export const APP_CATEGORIES: AppCategory[] = [
    "Communication",
    "Development",
    "Design",
    "Productivity",
    "Storage",
];

export const RELAY_APPS: RelayApp[] = [
    {
        id: "slack",
        name: "Slack",
        description: "Bring conversations and notifications into Relay.",
        category: "Communication",
        initials: "S",
        iconClassName: "bg-[#4A154B] text-white",
        popular: true,
        connected: true,
        users: "12 members",
    },
    {
        id: "discord",
        name: "Discord",
        description: "Connect communities and team conversations.",
        category: "Communication",
        initials: "D",
        iconClassName: "bg-[#5865F2] text-white",
        popular: true,
        users: "8 members",
    },
    {
        id: "github",
        name: "GitHub",
        description: "Track repositories, issues and pull requests.",
        category: "Development",
        initials: "GH",
        iconClassName: "bg-[#18181b] text-white",
        popular: true,
        connected: true,
        users: "7 members",
    },
    {
        id: "linear",
        name: "Linear",
        description: "Sync projects, issues and engineering workflows.",
        category: "Development",
        initials: "L",
        iconClassName: "bg-[#5E6AD2] text-white",
        popular: true,
        users: "6 members",
    },
    {
        id: "figma",
        name: "Figma",
        description: "Keep design work connected to your workspace.",
        category: "Design",
        initials: "F",
        iconClassName: "bg-[#1E1E1E] text-white",
        popular: true,
        connected: true,
        users: "4 members",
    },
    {
        id: "notion",
        name: "Notion",
        description: "Bring documents, knowledge and notes into Relay.",
        category: "Productivity",
        initials: "N",
        iconClassName: "bg-white text-black border border-zinc-200",
        popular: true,
        users: "11 members",
    },
    {
        id: "google-drive",
        name: "Google Drive",
        description: "Access shared files and documents from Relay.",
        category: "Storage",
        initials: "G",
        iconClassName: "bg-white text-zinc-900 border border-zinc-200",
        users: "14 members",
    },
    {
        id: "trello",
        name: "Trello",
        description: "Connect boards and project activity.",
        category: "Productivity",
        initials: "T",
        iconClassName: "bg-[#0C66E4] text-white",
        users: "5 members",
    },
    {
        id: "jira",
        name: "Jira",
        description: "Bring engineering issues and project updates together.",
        category: "Development",
        initials: "J",
        iconClassName: "bg-[#1868DB] text-white",
        users: "9 members",
    },
    {
        id: "zoom",
        name: "Zoom",
        description: "Connect meetings and communication workflows.",
        category: "Communication",
        initials: "Z",
        iconClassName: "bg-[#2D8CFF] text-white",
        users: "18 members",
    },
    {
        id: "dropbox",
        name: "Dropbox",
        description: "Keep shared files accessible to your workspace.",
        category: "Storage",
        initials: "D",
        iconClassName: "bg-[#0061FF] text-white",
        users: "10 members",
    },
    {
        id: "canva",
        name: "Canva",
        description: "Connect creative assets and design workflows.",
        category: "Design",
        initials: "C",
        iconClassName: "bg-[#00C4CC] text-white",
        users: "3 members",
    },
];