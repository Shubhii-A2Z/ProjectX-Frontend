import { Check, ChevronDown, Rocket, Sparkles, Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface ModelItem {
    id: string;
    name: string;
    provider: string;
    description: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const AVAILABLE_MODELS: ModelItem[] = [
    {
        id: "core",
        name: "Core 1.1",
        provider: "RelayAI",
        description: "Fast reasoning & general chat",
        badge: "Fast",
        icon: Zap
    },
    {
        id: "deep",
        name: "Deep 1.0",
        provider: "RelayAI",
        description: "Advanced reasoning & complex tasks",
        badge: "Smart",
        icon: Sparkles
    },
    {
        id: "flash",
        name: "Flash 1.2",
        provider: "RelayAI",
        description: "Fastest reasoning",
        badge: "Ultra Fast",
        icon: Rocket
    }
];

interface ChatModelSelectorProps {
    selectedModel: string;
    onSelectModel: (modelId: string) => void;
    disabled?: boolean;
}

export const ChatModelSelector: React.FC<ChatModelSelectorProps> = ({
    selectedModel,
    onSelectModel,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentModel = AVAILABLE_MODELS.find(m => m.id === selectedModel) || AVAILABLE_MODELS[0];
    const Icon = currentModel.icon;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/70 text-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                    isOpen && "bg-muted border-primary/40 ring-1 ring-primary/30"
                )}
            >
                <Icon className="size-3.5 text-primary" />
                <span>{currentModel.name}</span>
                <ChevronDown className={cn("size-3 text-muted-foreground transition-transform duration-150", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute bottom-full mb-2 left-0 z-50 w-64 rounded-xl border border-border bg-popover p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95">
                    <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Select AI Model
                    </div>
                    <div className="space-y-1 mt-1">
                        {AVAILABLE_MODELS.map((model) => {
                            const isSelected = model.id === currentModel.id;
                            const ModelIcon = model.icon;
                            return (
                                <button
                                    key={model.id}
                                    type="button"
                                    onClick={() => {
                                        onSelectModel(model.id);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer text-xs",
                                        isSelected
                                            ? "bg-accent text-accent-foreground font-medium"
                                            : "hover:bg-muted/70 text-foreground"
                                    )}
                                >
                                    <ModelIcon className={cn("size-4 mt-0.5 shrink-0", isSelected ? "text-primary" : "text-muted-foreground")} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="truncate">{model.name}</span>
                                            {model.badge && (
                                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                                                    {model.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                            {model.description}
                                        </p>
                                    </div>
                                    {isSelected && <Check className="size-3.5 text-primary shrink-0 mt-1" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

