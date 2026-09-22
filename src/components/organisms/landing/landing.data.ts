import {
    Hash,
    Home,
    Layers3,
    type LucideIcon,
    MessageCircle,
    MessageSquare,
    Users,
    Zap,
} from "lucide-react";

export interface ProductPreviewStatus {
    label: string;
    value: string;
}

export interface ProductPreviewActivity {
    label: string;
    value: string;
    time: string;
}

export interface LandingLink {
    label: string;
    anchor?: string;
    route?: string;
    external?: boolean;
}

export interface FeatureItem {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface ProductNavigationItem {
    label: string;
    icon: LucideIcon;
    active?: boolean;
}

export interface ProductStat {
    value: string;
    label: string;
}

export interface ProductConversation {
    type: "channel" | "message";
    title: string;
    preview: string;
    time: string;
}

export interface CollaborationMessage {
    initial: string;
    author: string;
    time: string;
    content: string;
}

export interface WhyRelayItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface LandingFooterColumn {
    title: string;
    links: LandingLink[];
}

export interface LandingConfig {
    brand: {
        name: string;
        logoInitial: string;
        homeRoute: string;
    };

    announcement: {
        product: string;
        label: string;
        description: string;
        route: string;
    };

    navbar: {
        links: LandingLink[];
        login: {
            label: string;
            route: string;
        };
        signup: {
            label: string;
            route: string;
        };
    };

    hero: {
        eyebrow: string;
        title: string;
        highlightedTitle: string;
        description: string;

        primaryAction: {
            label: string;
            route: string;
        };

        secondaryAction: {
            label: string;
            anchor: string;
        };

        floatingFeatures: string[];

        floatingCard: {
            title: string;
            description: string;
        };
    };

    productShowcase: {
        eyebrow: string;
        title: string;
        description: string;
        browserUrl: string;
        logoInitial: string;
        workspaceName: string;
        workspaceLabel: string;
        greeting: string;
        heading: string;
        navigation: ProductNavigationItem[];
        stats: ProductStat[];
        conversationsTitle: string;
        conversations: ProductConversation[];
        bottomMessage: string;

        status: ProductPreviewStatus;
        activity: ProductPreviewActivity[];

        conversationsActionLabel: string;

        floatingCard: {
            title: string;
            description: string;
        };
    };

    features: {
        eyebrow: string;
        title: string;
        description: string;
        items: FeatureItem[];
    };

    collaboration: {
        eyebrow: string;
        title: string;
        description: string;
        benefits: string[];
        linkLabel: string;
        channel: {
            name: string;
            members: string;
            messages: CollaborationMessage[];
            inputPlaceholder: string;
        };
    };

    whyRelay: {
        eyebrow: string;
        title: string;
        description: string;
        items: WhyRelayItem[];
    };

    v2Preview: {
        badge: string;
        title: string;
        description: string;
        buttonLabel: string;
        agent: {
            name: string;
            status: string;
            steps: string[];
        };
    };

    cta: {
        title: string;
        description: string;
        buttonLabel: string;
        buttonRoute: string;
    };

    footer: {
        brandName: string;
        logoInitial: string;
        description: string;
        columns: LandingFooterColumn[];
        copyright: string;
        tagline: string;
    };
}

export const LANDING_CONFIG: LandingConfig = {
    brand: {
        name: "Relay",
        logoInitial: "R",
        homeRoute: "/",
    },

    announcement: {
        product: "RelayAI",
        label: "Coming in Relay 2.0",
        description: "Meet the next generation of Relay.",
        route: "/app",
    },

    navbar: {
        links: [
            {
                label: "Features",
                anchor: "features",
            },
            {
                label: "Collaboration",
                anchor: "collaboration",
            },
            {
                label: "About",
                anchor: "about",
            },
            {
                label: "Pricing",
                route: "/pricing",
            },
        ],

        login: {
            label: "Log in",
            route: "/auth/login",
        },

        signup: {
            label: "Get started",
            route: "/auth/signup",
        },
    },

    hero: {
        eyebrow: "The modern workspace for teams",

        title: "Your team's work,",

        highlightedTitle: "connected.",

        description:
            "Relay brings conversations, teams, workspaces and collaboration together so your team can focus on building great things.",

        primaryAction: {
            label: "Get started for free",
            route: "/auth/signup",
        },

        secondaryAction: {
            label: "See how Relay works",
            anchor: "product-showcase",
        },

        floatingFeatures: [
            "Team communication",
            "Organized channels",
            "Connected workspaces",
        ],

        floatingCard: {
            title: "Everything in one place",
            description: "Your team stays aligned.",
        },
    },

    productShowcase: {
        conversationsActionLabel: "View all",

        floatingCard: {
            title: "Connected workspace",
            description: "Your team, in one place.",
        },
        status: {
            label: "Workspace status",
            value: "Everything is in sync",
        },
        activity: [
            {
                label: "Project Alpha",
                value: "New update shared",
                time: "2m",
            },
            {
                label: "Engineering",
                value: "Build #142 is ready",
                time: "18m",
            },
            {
                label: "Design Team",
                value: "New discussion started",
                time: "1h",
            },
        ],
        eyebrow: "One workspace. Everything connected.",

        title: "A simpler place for your team to work together.",

        description:
            "Keep conversations, channels, people and workspaces connected without constantly jumping between different tools.",

        browserUrl: "app.relay.work",

        logoInitial: "R",

        workspaceName: "Relay",

        workspaceLabel: "Product Team",

        greeting: "Good morning,",

        heading: "Here's what's happening.",

        navigation: [
            {
                label: "Home",
                icon: Home,
                active: true,
            },
            {
                label: "Messages",
                icon: MessageCircle,
            },
            {
                label: "Channels",
                icon: Hash,
            },
            {
                label: "Team",
                icon: Users,
            },
        ],

        stats: [
            {
                value: "128",
                label: "Messages",
            },
            {
                value: "24",
                label: "Channels",
            },
            {
                value: "42",
                label: "Team members",
            },
        ],

        conversationsTitle: "Recent conversations",

        conversations: [
            {
                type: "channel",
                title: "# project-alpha",
                preview: "Sarah shared an update with the team",
                time: "2m",
            },
            {
                type: "channel",
                title: "# engineering",
                preview: "Alex: The latest build is ready",
                time: "18m",
            },
            {
                type: "message",
                title: "Design team",
                preview: "Let's review the new workspace flow",
                time: "1h",
            },
        ],

        bottomMessage:
            "Everything your team needs to stay aligned, in one place.",
    },

    features: {
        eyebrow: "Built around your team",

        title: "Everything you need to stay connected.",

        description:
            "Relay brings the essential pieces of team collaboration together in one focused workspace.",

        items: [
            {
                number: "01",
                title: "Team communication",
                description:
                    "Keep conversations organized and accessible to the people who need them.",
                icon: MessageSquare,
            },
            {
                number: "02",
                title: "Organized channels",
                description:
                    "Create dedicated spaces for projects, teams and focused discussions.",
                icon: Hash,
            },
            {
                number: "03",
                title: "Connected workspaces",
                description:
                    "Bring people and project conversations into a shared workspace.",
                icon: Users,
            },
            {
                number: "04",
                title: "Fast and focused",
                description:
                    "Reduce unnecessary switching and keep your team's attention where it matters.",
                icon: Zap,
            },
        ],
    },

    collaboration: {
        eyebrow: "Collaboration without the clutter",

        title: "Give every conversation a place.",

        description:
            "From project discussions to team-wide conversations, Relay keeps communication structured without making it complicated.",

        benefits: [
            "Keep conversations organized",
            "Create dedicated team channels",
            "Bring projects and people together",
            "Reduce unnecessary app switching",
        ],

        linkLabel: "Explore collaboration",

        channel: {
            name: "# project-alpha",
            members: "12 members",

            messages: [
                {
                    initial: "A",
                    author: "Alex",
                    time: "10:42 AM",
                    content:
                        "The latest project update is ready for everyone to review.",
                },
                {
                    initial: "S",
                    author: "Sarah",
                    time: "10:45 AM",
                    content:
                        "Looks good. I'll share the final notes with the team.",
                },
                {
                    initial: "J",
                    author: "James",
                    time: "10:47 AM",
                    content:
                        "Perfect. Let's keep the discussion in this channel.",
                },
            ],

            inputPlaceholder: "Message #project-alpha...",
        },
    },

    whyRelay: {
        eyebrow: "Why Relay",

        title: "Designed around how teams actually communicate.",

        description:
            "Relay focuses on the core collaboration experience instead of filling your workspace with tools you may never use.",

        items: [
            {
                icon: MessageSquare,
                title: "Conversations stay connected",
                description:
                    "Keep project and team discussions in dedicated spaces where context is easy to find.",
            },
            {
                icon: Users,
                title: "Teams stay together",
                description:
                    "Workspaces give teams a shared place to communicate and collaborate.",
            },
            {
                icon: Layers3,
                title: "Work stays organized",
                description:
                    "Separate projects and conversations into clear channels without losing the bigger picture.",
            },
        ],
    },

    v2Preview: {
        badge: "Coming in Relay 2.0",

        title: "Relay is getting smarter.",

        description:
            "RelayAI is being built as the next layer of the Relay experience — helping teams reason, explore ideas and work with information directly inside their workspace.",

        buttonLabel: "Learn about Relay 2.0",

        agent: {
            name: "RelayAI",
            status: "Coming soon",

            steps: [
                "Understanding the conversation...",
                "Thinking through the context...",
                "Preparing a useful response...",
            ],
        },
    },

    cta: {
        title: "Bring your team together.",

        description:
            "Create your workspace and start collaborating with your team using Relay.",

        buttonLabel: "Get started for free",

        buttonRoute: "/auth/signup",
    },

    footer: {
        brandName: "Relay",
        logoInitial: "R",

        description:
            "A focused workspace for teams to communicate, organize and collaborate.",

        columns: [
            {
                title: "Product",
                links: [
                    {
                        label: "Features",
                        anchor: "features",
                    },
                    {
                        label: "Collaboration",
                        anchor: "collaboration",
                    },
                    {
                        label: "Pricing",
                        route: "/pricing",
                    },
                ],
            },
            {
                title: "Company",
                links: [
                    {
                        label: "About Relay",
                        anchor: "about",
                    },
                    {
                        label: "Contact",
                    },
                    {
                        label: "Careers",
                    },
                ],
            },
            {
                title: "Resources",
                links: [
                    {
                        label: "Documentation",
                    },
                    {
                        label: "Help Center",
                    },
                    {
                        label: "Community",
                    },
                ],
            },
        ],

        copyright: "© 2026 Relay. All rights reserved.",

        tagline: "Built for teams.",
    },
};