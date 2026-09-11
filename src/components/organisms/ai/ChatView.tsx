import { Bot, Code2, Lightbulb, MessageSquarePlus, Sparkles, Terminal } from "lucide-react";
import React, { useEffect, useRef } from "react";

import { useAIChat } from "@/hooks/apis/ai/useAIChat";

import { ChatMessage } from "./ChatMessage";
import { AVAILABLE_MODELS } from "./ChatModelSelector";
import { ChatPromptInput } from "./ChatPromptInput";

const STARTER_PROMPTS = [
    {
        title: "Code Architecture",
        desc: "Design a scalable REST API schema",
        icon: Code2,
        prompt: "Design a clean REST API schema with authentication, workspaces, and channels for a team collaboration platform."
    },
    {
        title: "Brainstorm Features",
        desc: "Generate ideas for our product roadmap",
        icon: Lightbulb,
        prompt: "Give me 5 innovative features for a modern async team collaboration and chat tool."
    },
    {
        title: "Explain Complex Logic",
        desc: "Break down how SSE streaming works",
        icon: Terminal,
        prompt: "Explain how Server-Sent Events (SSE) work compared to WebSockets in modern web applications."
    },
    {
        title: "Debug & Optimize",
        desc: "Find bottlenecks in React components",
        icon: Bot,
        prompt: "What are the most common performance traps in React 19 apps and how can I optimize re-renders?"
    }
];

export const ChatView: React.FC = () => {
    const {
        messages,
        isStreaming,
        selectedModel,
        setSelectedModel,
        sendMessage,
        stopStreaming,
        clearMessages
    } = useAIChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new chunks/messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isStreaming]);

    const activeModelName =
        AVAILABLE_MODELS.find((m) => m.id === selectedModel)?.name || "Relay AI";

    return (
        <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
            {/* Top Navigation Header */}
            <header className="h-14 border-b border-border/60 px-4 md:px-6 flex items-center justify-between bg-background/80 backdrop-blur-md shrink-0 z-10">
                <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                        <Sparkles className="size-4" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-semibold text-sm tracking-tight">Relay AI</h1>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {activeModelName}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Header Action: New Chat */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={clearMessages}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Start New Chat"
                    >
                        <MessageSquarePlus className="size-3.5" />
                        <span className="hidden sm:inline">New Chat</span>
                    </button>
                </div>
            </header>

            {/* Conversation Area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-4 md:px-6 py-4 flex flex-col items-center"
            >
                <div className="w-full max-w-3xl flex-1 flex flex-col">
                    {messages.length === 0 ? (
                        /* Empty State inspired by ClickUp clone */
                        <div className="flex-1 flex flex-col items-center justify-center py-12 text-center my-auto">
                            <div className="size-14 rounded-2xl bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-sky-500/20 border border-purple-500/30 flex items-center justify-center mb-5 text-purple-400 shadow-xl shadow-purple-500/5 animate-pulse">
                                <Sparkles className="size-7" />
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                                How can I help you today?
                            </h2>
                            <p className="text-sm text-muted-foreground max-w-md mb-8">
                                Powered by high-speed Groq inference with DeepSeek R1 reasoning and Llama 3.3.
                            </p>

                            {/* Starter Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-left">
                                {STARTER_PROMPTS.map((starter, idx) => {
                                    const Icon = starter.icon;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => sendMessage(starter.prompt)}
                                            className="group p-3.5 rounded-xl border border-border/70 bg-card/60 hover:bg-muted/80 hover:border-primary/40 transition-all text-left cursor-pointer flex items-start gap-3 shadow-sm hover:shadow-md"
                                        >
                                            <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Icon className="size-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {starter.title}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                                    {starter.desc}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Message List */
                        <div className="divide-y divide-border/20 py-2">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Floating Prompt Input */}
            <div className="shrink-0 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
                <ChatPromptInput
                    onSendMessage={sendMessage}
                    isStreaming={isStreaming}
                    onStopStreaming={stopStreaming}
                    selectedModel={selectedModel}
                    onSelectModel={setSelectedModel}
                />
            </div>
        </div>
    );
};
