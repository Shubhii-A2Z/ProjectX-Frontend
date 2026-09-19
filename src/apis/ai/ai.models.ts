export interface AIModel {
    id: string;
    displayName: string;
    description: string;
}

export const AI_MODELS: AIModel[] = [
    {
        id: "openai/gpt-oss-20b",
        displayName: "Swift",
        description: "Fast and efficient",
    },
    {
        id: "llama-3.3-70b-versatile",
        displayName: "Core",
        description: "Balanced for everyday work",
    },
];

export const DEFAULT_AI_MODEL = AI_MODELS[0];

export const getAIModelDisplayName = (
    modelId?: string
): string => {
    if (!modelId) {
        return "RelayAI";
    }

    return (
        AI_MODELS.find(
            (model) => model.id === modelId
        )?.displayName ?? modelId
    );
};
