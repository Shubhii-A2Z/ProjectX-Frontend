import { Brain, ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface ChatReasoningProps {
    reasoning: string;
    isStreaming?: boolean;
    duration?: number;
}

export const ChatReasoning: React.FC<ChatReasoningProps> = ({
    reasoning,
    isStreaming = false,
    duration
}) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!reasoning && !isStreaming) return null;

    return (
        <div className="my-2 rounded-xl border border-border/60 bg-muted/30 text-xs overflow-hidden transition-all">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-3.5 py-2.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Brain className="size-4 text-purple-400 animate-pulse" />
                    <span>
                        {isStreaming ? (
                            <span className="flex items-center gap-1.5">
                                Thinking
                                <span className="inline-flex gap-0.5">
                                    <span className="animate-bounce delay-0">.</span>
                                    <span className="animate-bounce delay-150">.</span>
                                    <span className="animate-bounce delay-300">.</span>
                                </span>
                            </span>
                        ) : duration ? (
                            `Thought for ${duration}s`
                        ) : (
                            "Thought Process"
                        )}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "size-4 transition-transform duration-200 text-muted-foreground",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}
                />
            </button>

            {isOpen && (
                <div className="border-t border-border/40 px-3.5 py-3 text-muted-foreground font-mono text-[13px] leading-relaxed whitespace-pre-wrap bg-background/50 max-h-72 overflow-y-auto">
                    {reasoning || "Analyzing context and planning response..."}
                </div>
            )}
        </div>
    );
};

