import { Sparkles, Zap } from "lucide-react";
import type { ComponentType } from "react";

export interface ModelItem {
    id: string;
    name: string;
    shortName: string;
    provider: string;
    description: string;
    badge?: string;
    icon: ComponentType<{ className?: string }>;
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
    },
    {
        id: "deep",
        name: "RelayAI Deep",
        shortName: "Deep",
        provider: "RelayAI",
        description: "Advanced reasoning for complex tasks",
        badge: "Smart",
        icon: Sparkles,
    },
];