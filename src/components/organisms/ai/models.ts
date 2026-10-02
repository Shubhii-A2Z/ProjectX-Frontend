import { BrainCircuit, Zap } from "lucide-react";
import type { ComponentType } from "react";

export interface ModelItem {
    id: string;
    name: string;
    shortName: string;
    provider: string;
    description: string;
    badge?: string;
    icon: ComponentType<{ className?: string }>;
    accent: "cyan" | "violet";
    capabilities: string[];
}

export const AVAILABLE_MODELS: ModelItem[] = [
    {
        id: "core",
        name: "RelayAI Core",
        shortName: "Core",
        provider: "RelayAI",
        description: "Fast everyday reasoning and chat",
        badge: "Fast",
        icon: Zap,
        accent: "cyan",
        capabilities: [
            "Everyday questions",
            "Writing",
            "Coding",
            "Quick analysis",
        ],
    },
    {
        id: "deep",
        name: "RelayAI Deep",
        shortName: "Deep",
        provider: "RelayAI",
        description: "Advanced reasoning for complex tasks",
        badge: "Smart",
        icon: BrainCircuit,
        accent: "violet",
        capabilities: [
            "Complex reasoning",
            "Architecture",
            "Research",
            "Deep analysis",
        ],
    },
];

export const DEFAULT_MODEL_ID = AVAILABLE_MODELS[0].id;

export const getModelById = (
    modelId: string
): ModelItem => {
    return (
        AVAILABLE_MODELS.find((model) => model.id === modelId) ??
        AVAILABLE_MODELS[0]
    );
};