export type AIThinkingPhase =
    | "understanding"
    | "planning"
    | "working"
    | "preparing";

export interface AIThinkingPhaseConfig {
    id: AIThinkingPhase;
    label: string;
    weight: number;
}

export const AI_THINKING_CONFIG = {
    totalDelayMs: 6000,

    phases: [
        {
            id: "understanding",
            label: "Understanding your request",
            weight: 0.24,
        },
        {
            id: "planning",
            label: "Planning a response",
            weight: 0.25,
        },
        {
            id: "working",
            label: "Working through the details",
            weight: 0.29,
        },
        {
            id: "preparing",
            label: "Preparing the answer",
            weight: 0.22,
        },
    ] satisfies AIThinkingPhaseConfig[],
} as const;

/**
 * Returns the configured thinking delay.
 *
 * Kept as a function so the UI/hook does not need to
 * know how the delay is configured.
 */
export const getThinkingDelay = (): number => {
    return AI_THINKING_CONFIG.totalDelayMs;
};