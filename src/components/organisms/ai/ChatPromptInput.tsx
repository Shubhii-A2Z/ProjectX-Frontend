import { ArrowUp, Square } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ChatModelSelector } from "./ChatModelSelector";

interface ChatPromptInputProps {
    onSendMessage: (prompt: string) => void;
    isStreaming: boolean;
    onStopStreaming?: () => void;
    selectedModel: string;
    onSelectModel: (modelId: string) => void;
    placeholder?: string;
}

export const ChatPromptInput: React.FC<ChatPromptInputProps> = ({
    onSendMessage,
    isStreaming,
    onStopStreaming,
    selectedModel,
    onSelectModel,
    placeholder = "Ask Relay AI anything..."
}) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
        }
    }, [input]);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isStreaming) return;

        onSendMessage(trimmed);
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-4">
            <div className="relative rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md shadow-xl transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm text-foreground placeholder:text-muted-foreground outline-none max-h-48 min-h-[48px]"
                />

                {/* Footer Toolbar */}
                <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
                    {/* Left: Model Selector Pill */}
                    <div className="flex items-center gap-2">
                        <ChatModelSelector
                            selectedModel={selectedModel}
                            onSelectModel={onSelectModel}
                            disabled={isStreaming}
                        />
                    </div>

                    {/* Right: Submit or Stop Button */}
                    <div className="flex items-center gap-2">
                        {isStreaming ? (
                            <button
                                type="button"
                                onClick={onStopStreaming}
                                className="size-8 rounded-xl bg-destructive/90 hover:bg-destructive text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-md"
                                title="Stop generating"
                            >
                                <Square className="size-3.5 fill-current" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={!input.trim()}
                                className={cn(
                                    "size-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm",
                                    input.trim()
                                        ? "bg-primary text-primary-foreground hover:scale-105 shadow-primary/25"
                                        : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                                )}
                                title="Send message"
                            >
                                <ArrowUp className="size-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center mt-2">
                <span className="text-[11px] text-muted-foreground/70">
                    Relay AI can make mistakes. Verify important information.
                </span>
            </div>
        </div>
    );
};

