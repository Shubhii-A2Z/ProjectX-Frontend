export const RELAY_MOTION = {
    duration: {
        fast: 0.12,
        normal: 0.18,
        slow: 0.26,
    },

    ease: {
        standard: [0.2, 0.8, 0.2, 1],
        emphasized: [0.16, 1, 0.3, 1],
    },

    spring: {
        gentle: {
            type: "spring",
            stiffness: 320,
            damping: 28,
        },

        responsive: {
            type: "spring",
            stiffness: 420,
            damping: 32,
        },

        soft: {
            type: "spring",
            stiffness: 220,
            damping: 24,
        },
    },
} as const;