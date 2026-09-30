import {
    FileText,
    // Hash,
    Image,
    Link2,
    // MessageSquare,
    Plus,
    Search,
    Smile,
    Sparkles,
    Users,
} from "lucide-react";

export const CHAT_HEADER = {
    channel: "engineering",
    description: "Engineering discussions and product development",
    members: 18,
} as const;

export const CHAT_ACTIONS = [
    {
        id: "search",
        label: "Search",
        icon: Search,
    },
    {
        id: "members",
        label: "Members",
        icon: Users,
    },
    {
        id: "files",
        label: "Files",
        icon: FileText,
    },
] as const;

export const CHAT_MESSAGES = [
    {
        id: "msg-1",
        author: "Alex Morgan",
        initials: "AM",
        avatar: "from-cyan-400/30 to-blue-500/20",
        time: "9:42 PM",
        content:
            "I pushed the latest changes to the workspace navigation. The new rail feels much cleaner now.",
        reactions: [
            { emoji: "👍", count: 4 },
            { emoji: "🚀", count: 2 },
        ],
        replies: 3,
    },
    {
        id: "msg-2",
        author: "Maya Patel",
        initials: "MP",
        avatar: "from-violet-400/30 to-fuchsia-500/20",
        time: "9:45 PM",
        content:
            "Nice. I think we should keep the contextual sidebar persistent too. It makes switching between channels much faster.",
        reactions: [
            { emoji: "💯", count: 3 },
        ],
        replies: 1,
    },
    {
        id: "msg-3",
        author: "You",
        initials: "S",
        avatar: "from-cyan-400/25 to-violet-500/25",
        time: "9:48 PM",
        content:
            "Agreed. I'm keeping the shell persistent and making the main workspace replaceable through the router.",
        reactions: [
            { emoji: "🔥", count: 2 },
        ],
        replies: 0,
    },
    {
        id: "msg-4",
        author: "Sam Wilson",
        initials: "SW",
        avatar: "from-emerald-400/25 to-teal-500/20",
        time: "9:51 PM",
        content:
            "That also gives us a nice foundation for RelayAI. The AI experience can live inside the same workspace rather than feeling like a separate app.",
        reactions: [
            { emoji: "✨", count: 5 },
            { emoji: "👍", count: 2 },
        ],
        replies: 4,
    },
    {
        id: "msg-5",
        author: "Alex Morgan",
        initials: "AM",
        avatar: "from-cyan-400/30 to-blue-500/20",
        time: "9:56 PM",
        content:
            "Exactly. Same workspace, different intelligence layer. That feels much more like the direction Relay should take.",
        reactions: [],
        replies: 0,
    },
] as const;

export const CHAT_MEMBERS = [
    {
        id: "alex",
        name: "Alex Morgan",
        initials: "AM",
        status: "Building navigation",
        color: "from-cyan-400/30 to-blue-500/20",
        online: true,
    },
    {
        id: "maya",
        name: "Maya Patel",
        initials: "MP",
        status: "Designing",
        color: "from-violet-400/30 to-fuchsia-500/20",
        online: true,
    },
    {
        id: "sam",
        name: "Sam Wilson",
        initials: "SW",
        status: "Reviewing",
        color: "from-emerald-400/25 to-teal-500/20",
        online: false,
    },
    {
        id: "you",
        name: "You",
        initials: "S",
        status: "Online",
        color: "from-cyan-400/25 to-violet-500/25",
        online: true,
    },
] as const;

export const CHAT_DETAILS = [
    {
        id: "files",
        label: "Files",
        count: 12,
        icon: FileText,
    },
    {
        id: "links",
        label: "Links",
        count: 8,
        icon: Link2,
    },
    {
        id: "media",
        label: "Media",
        count: 24,
        icon: Image,
    },
] as const;

export const CHAT_COMPOSER_ACTIONS = [
    {
        id: "attach",
        label: "Attach",
        icon: Plus,
    },
    {
        id: "emoji",
        label: "Emoji",
        icon: Smile,
    },
    {
        id: "ai",
        label: "Ask RelayAI",
        icon: Sparkles,
    },
] as const;