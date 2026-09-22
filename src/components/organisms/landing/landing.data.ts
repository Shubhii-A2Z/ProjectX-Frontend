import type { LucideIcon } from "lucide-react";
import {
    Activity,
    // Brain,
    CheckCircle2,
    Hash,
    Home,
    MessageCircle,
    MessageSquare,
    // Sparkles,
    Users,
    Zap,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

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
    visual:
        | "communication"
        | "channels"
        | "workspace"
        | "focus";
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

/* =========================================================
   LANDING CONFIG TYPE
========================================================= */

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

/* =========================================================
   LANDING CONFIG
========================================================= */

export const LANDING_CONFIG: LandingConfig = {
    /* -----------------------------------------------------
       BRAND
    ----------------------------------------------------- */

    brand: {
        name: "Relay",
        logoInitial: "R",
        homeRoute: "/",
    },

    /* -----------------------------------------------------
       ANNOUNCEMENT
    ----------------------------------------------------- */

    announcement: {
        product: "RelayAI",
        label: "Coming in Relay 2.0",
        description: "Meet the next generation of Relay.",
        route: "/app",
    },

    /* -----------------------------------------------------
       NAVBAR
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       HERO
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       PRODUCT SHOWCASE
    ----------------------------------------------------- */

    productShowcase: {
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

        conversationsActionLabel: "View all",

        floatingCard: {
            title: "Connected workspace",
            description: "Your team, in one place.",
        },
    },

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

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

                visual: "communication",
            },

            {
                number: "02",

                title: "Organized channels",

                description:
                    "Create dedicated spaces for projects, teams and focused discussions.",

                icon: Hash,

                visual: "channels",
            },

            {
                number: "03",

                title: "Connected workspaces",

                description:
                    "Bring people and project conversations into a shared workspace.",

                icon: Users,

                visual: "workspace",
            },

            {
                number: "04",

                title: "Fast and focused",

                description:
                    "Reduce unnecessary switching and keep your team's attention where it matters.",

                icon: Zap,

                visual: "focus",
            },
        ],
    },

    /* -----------------------------------------------------
       COLLABORATION
    ----------------------------------------------------- */

    collaboration: {
        eyebrow: "Built for collaboration",

        title: "Turn conversations into progress.",

        description:
            "Relay gives every team a shared space where discussions stay organized, context stays visible and everyone knows what's happening.",

        benefits: [
            "Organized team conversations",
            "Dedicated channels for every project",
            "Real-time collaboration",
            "Everything stays connected",
        ],

        linkLabel: "Explore collaboration",

        channel: {
            name: "project-alpha",
            members: "12 members",

            messages: [
                {
                    initial: "S",
                    author: "Sarah",
                    time: "10:24 AM",
                    content:
                        "The latest product update is ready for review.",
                },

                {
                    initial: "A",
                    author: "Alex",
                    time: "10:26 AM",
                    content:
                        "Looks good. I'll take a look at the new workspace flow.",
                },

                {
                    initial: "J",
                    author: "Jordan",
                    time: "10:28 AM",
                    content:
                        "I've added the final design notes to the discussion.",
                },

                {
                    initial: "S",
                    author: "Sarah",
                    time: "10:31 AM",
                    content:
                        "Perfect. Let's sync everything before the next release.",
                },
            ],

            inputPlaceholder:
                "Message #project-alpha...",
        },
    },

    /* -----------------------------------------------------
       WHY RELAY
    ----------------------------------------------------- */

    whyRelay: {
        eyebrow: "Why Relay",

        title: "Less switching. More building.",

        description:
            "Relay is designed around the way modern teams actually work — together, continuously and across multiple conversations.",

        items: [
            {
                icon: Zap,

                title: "Move faster",

                description:
                    "Keep important conversations and collaboration in the same workspace so your team can spend less time switching tools.",
            },

            {
                icon: Users,

                title: "Stay connected",

                description:
                    "Give teams dedicated spaces to communicate, share updates and keep everyone aligned.",
            },

            {
                icon: Activity,

                title: "See what's happening",

                description:
                    "Keep project activity visible so important updates don't disappear inside disconnected tools.",
            },

            {
                icon: CheckCircle2,

                title: "Keep everything organized",

                description:
                    "Structure conversations around channels, teams and workspaces instead of letting information become scattered.",
            },
        ],
    },

    /* -----------------------------------------------------
       RELAY 2.0 / AI PREVIEW
    ----------------------------------------------------- */

    v2Preview: {
        badge: "Coming in Relay 2.0",

        title: "Your workspace is about to get smarter.",

        description:
            "RelayAI will bring intelligent assistance directly into your workspace — helping your team think, create and move faster without leaving the conversation.",

        buttonLabel: "Explore RelayAI",

        agent: {
            name: "RelayAI",

            status: "Thinking",

            steps: [
                "Understanding the conversation",
                "Analyzing project context",
                "Preparing a response",
            ],
        },
    },

    /* -----------------------------------------------------
       CTA
    ----------------------------------------------------- */

    cta: {
        title: "Bring your team together.",

        description:
            "Create a workspace where conversations, people and projects stay connected.",

        buttonLabel: "Get started for free",

        buttonRoute: "/auth/signup",
    },

    /* -----------------------------------------------------
       FOOTER
    ----------------------------------------------------- */

    footer: {
        brandName: "Relay",

        logoInitial: "R",

        description:
            "A modern workspace for teams to communicate, collaborate and build together.",

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
                        label: "About",
                        anchor: "about",
                    },
                    {
                        label: "Contact",
                        anchor: "contact",
                    },
                ],
            },

            {
                title: "Account",

                links: [
                    {
                        label: "Log in",
                        route: "/auth/login",
                    },
                    {
                        label: "Sign up",
                        route: "/auth/signup",
                    },
                ],
            },
        ],

        copyright: "© 2026 Relay. All rights reserved.",

        tagline: "Built for teams that build.",
    },
};