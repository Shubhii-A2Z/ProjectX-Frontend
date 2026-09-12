import {
    Bot,
    Code2,
    Lightbulb,
    MessageSquarePlus,
    Sparkles,
    Terminal
} from "lucide-react";
import React, {
    useEffect,
    useRef
} from "react";

import { useAIChat } from "@/hooks/apis/ai/useAIChat";

import { ChatMessage } from "./ChatMessage";
import {
    AVAILABLE_MODELS
} from "./ChatModelSelector";
import { ChatPromptInput } from "./ChatPromptInput";

const STARTER_PROMPTS = [
    {
        title: "Code Architecture",
        desc: "Design a scalable REST API schema",
        icon: Code2,
        prompt:
            "Design a clean REST API schema with authentication, workspaces, and channels for a team collaboration platform."
    },
    {
        title: "Brainstorm Features",
        desc: "Generate ideas for our product roadmap",
        icon: Lightbulb,
        prompt:
            "Give me 5 innovative features for a modern async team collaboration and chat tool."
    },
    {
        title: "Explain Complex Logic",
        desc: "Break down how SSE streaming works",
        icon: Terminal,
        prompt:
            "Explain how Server-Sent Events (SSE) work compared to WebSockets in modern web applications."
    },
    {
        title: "Debug & Optimize",
        desc: "Find bottlenecks in React components",
        icon: Bot,
        prompt:
            "What are the most common performance traps in React 19 apps and how can I optimize re-renders?"
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

    const messagesEndRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, isStreaming]);

    const activeModelName =
        AVAILABLE_MODELS.find(
            (model) =>
                model.id === selectedModel
        )?.name || "RelayAI";

    return (
        <div
            className="
                flex
                h-screen
                w-full
                flex-col
                overflow-hidden
                bg-background
                text-foreground
            "
        >
            {/* HEADER */}
            <header
                className="
                    z-10
                    flex
                    h-14
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-border/60
                    bg-background/80
                    px-4
                    backdrop-blur-md
                    md:px-6
                "
            >
                <div className="flex items-center gap-2.5">
                    {/* AI ICON */}
                    <div
                        className="
                            flex size-8
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-tr
                            from-purple-600
                            via-indigo-600
                            to-sky-500
                            text-white
                            shadow-md
                            shadow-purple-500/20
                        "
                    >
                        <Sparkles className="size-4" />
                    </div>

                    {/* TITLE */}
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-semibold tracking-tight">
                                RelayAI
                            </h1>

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-primary/20
                                    bg-primary/10
                                    px-2
                                    py-0.5
                                    text-[10px]
                                    font-medium
                                    text-primary
                                "
                            >
                                {activeModelName}
                            </span>
                        </div>
                    </div>
                </div>

                {/* NEW CHAT */}
                <button
                    type="button"
                    onClick={clearMessages}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-border/70
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-muted-foreground
                        transition-colors
                        hover:bg-muted
                        hover:text-foreground
                    "
                    title="Start New Chat"
                >
                    <MessageSquarePlus className="size-3.5" />

                    <span className="hidden sm:inline">
                        New Chat
                    </span>
                </button>
            </header>

            {/* CHAT AREA */}
            <div
                className="
                    flex
                    flex-1
                    flex-col
                    items-center
                    overflow-y-auto
                    px-4
                    py-4
                    md:px-6
                "
            >
                <div
                    className="
                        flex
                        w-full
                        max-w-3xl
                        flex-1
                        flex-col
                    "
                >
                    {/* EMPTY STATE */}
                    {messages.length === 0 ? (
                        <div
                            className="
                                my-auto
                                flex
                                flex-1
                                flex-col
                                items-center
                                justify-center
                                py-12
                                text-center
                            "
                        >
                            {/* ICON */}
                            <div
                                className="
                                    mb-5
                                    flex size-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-purple-500/30
                                    bg-gradient-to-br
                                    from-purple-500/20
                                    via-indigo-500/20
                                    to-sky-500/20
                                    text-purple-400
                                    shadow-xl
                                    shadow-purple-500/5
                                    animate-pulse
                                "
                            >
                                <Sparkles className="size-7" />
                            </div>

                            {/* TITLE */}
                            <h2
                                className="
                                    mb-2
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    md:text-2xl
                                "
                            >
                                How can I help you today?
                            </h2>

                            {/* DESCRIPTION */}
                            <p
                                className="
                                    mb-8
                                    max-w-md
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                RelayAI helps you think,
                                build, debug, and
                                collaborate faster.
                            </p>

                            {/* STARTER PROMPTS */}
                            <div
                                className="
                                    grid
                                    w-full
                                    max-w-xl
                                    grid-cols-1
                                    gap-3
                                    text-left
                                    sm:grid-cols-2
                                "
                            >
                                {STARTER_PROMPTS.map(
                                    (starter) => {
                                        const Icon =
                                            starter.icon;

                                        return (
                                            <button
                                                key={
                                                    starter.title
                                                }
                                                type="button"
                                                onClick={() =>
                                                    sendMessage(
                                                        starter.prompt
                                                    )
                                                }
                                                disabled={
                                                    isStreaming
                                                }
                                                className="
                                                    group
                                                    flex
                                                    cursor-pointer
                                                    items-start
                                                    gap-3
                                                    rounded-xl
                                                    border
                                                    border-border/70
                                                    bg-card/60
                                                    p-3.5
                                                    text-left
                                                    shadow-sm
                                                    transition-all
                                                    hover:border-primary/40
                                                    hover:bg-muted/80
                                                    hover:shadow-md
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex size-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-primary/10
                                                        text-primary
                                                        transition-transform
                                                        group-hover:scale-110
                                                    "
                                                >
                                                    <Icon className="size-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div
                                                        className="
                                                            text-xs
                                                            font-semibold
                                                            text-foreground
                                                            transition-colors
                                                            group-hover:text-primary
                                                        "
                                                    >
                                                        {
                                                            starter.title
                                                        }
                                                    </div>

                                                    <div
                                                        className="
                                                            mt-0.5
                                                            line-clamp-1
                                                            text-[11px]
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        {
                                                            starter.desc
                                                        }
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    ) : (
                        /* MESSAGES */
                        <div className="divide-y divide-border/20 py-2">
                            {messages.map(
                                (message) => (
                                    <ChatMessage
                                        key={
                                            message.id
                                        }
                                        message={
                                            message
                                        }
                                    />
                                )
                            )}

                            <div
                                ref={
                                    messagesEndRef
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* INPUT */}
            <div
                className="
                    shrink-0
                    bg-gradient-to-t
                    from-background
                    via-background/95
                    to-transparent
                    pt-2
                "
            >
                <ChatPromptInput
                    onSendMessage={
                        sendMessage
                    }
                    isStreaming={
                        isStreaming
                    }
                    onStopStreaming={
                        stopStreaming
                    }
                    selectedModel={
                        selectedModel
                    }
                    onSelectModel={
                        setSelectedModel
                    }
                />
            </div>
        </div>
    );
};