export type AIThinkingPhase =
    | "understanding"
    | "planning"
    | "working"
    | "preparing";

export interface AIThinkingPhaseConfig {
    id: AIThinkingPhase;
    label: string;
    shortLabel: string;
    description: string;
    weight: number;
}

export const AI_THINKING_CONFIG = {
    totalDelayMs: 6000,

    phases: [
        {
            id: "understanding",
            label: "Understanding your request",
            shortLabel: "Understanding",
            description: "Interpreting the request and relevant context",
            weight: 0.24,
        },
        {
            id: "planning",
            label: "Planning a response",
            shortLabel: "Planning",
            description: "Structuring the best way to approach the task",
            weight: 0.25,
        },
        {
            id: "working",
            label: "Working through the details",
            shortLabel: "Working",
            description: "Reasoning through the problem and possibilities",
            weight: 0.29,
        },
        {
            id: "preparing",
            label: "Preparing the answer",
            shortLabel: "Preparing",
            description: "Turning the result into a clear response",
            weight: 0.22,
        },
    ] satisfies AIThinkingPhaseConfig[],
} as const;

/**
 * Returns the configured thinking delay.
 *
 * Kept as a function so the hook does not
 * need to know how the delay is configured.
 */
export const getThinkingDelay = (): number => {
    return AI_THINKING_CONFIG.totalDelayMs;
};