export interface AIModel {
    id: string;
    displayName: string;
    description: string;
}

export const AI_MODELS: AIModel[] = [
    {
        id: "core",
        displayName: "RelayAI Core",
        description: "Your everyday AI assistant",
    },

    {
        id: "deep",
        displayName: "RelayAI Deep",
        description: "Advanced reasoning for complex tasks",
    },
];