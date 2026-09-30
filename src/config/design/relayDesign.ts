export const RELAY_DESIGN = {
    colors: {
        cyan: "rgb(34 211 238)",
        violet: "rgb(139 92 246)",
        blue: "rgb(59 130 246)",

        background: "rgb(7 8 12)",
        sidebar: "rgb(10 11 16)",
        panel: "rgb(14 15 21)",
        elevated: "rgb(18 19 27)",
        floating: "rgb(21 23 31)",

        text: {
            primary: "rgb(248 250 252)",
            secondary: "rgb(161 161 170)",
            muted: "rgb(113 113 122)",
            faint: "rgb(82 82 91)",
        },
    },

    radius: {
        sm: "8px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        xxl: "22px",
    },

    animation: {
        fast: 120,
        normal: 180,
        slow: 260,
    },

    layout: {
        railWidth: 76,
        sidebarMinWidth: 240,
        sidebarDefaultWidth: 292,
        sidebarMaxWidth: 380,
    },
} as const;