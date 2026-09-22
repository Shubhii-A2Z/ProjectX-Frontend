import {
    ArrowRight,
    CheckCircle2,
    FileText,
    ListTodo,
    MessageSquare,
    Plus,
    Search,
    Sparkles,
    WandSparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import relayAiLogo from "@/assets/relay-ai-logo.png";
import { useAIChat } from "@/hooks/apis/ai/useAIChat";

import { ChatMessage } from "./ChatMessage";
import { ChatPromptInput } from "./ChatPromptInput";
import { AVAILABLE_MODELS } from "./models";

type AIMode = "ask" | "agents"; // upcoming update teaser ("agents")

interface QuickAction {
    title: string;
    description: string;
    icon: typeof Sparkles;
    prompt: string;
}

const QUICK_ACTIONS: QuickAction[] = [
    {
        title: "Quick Summary",
        description: "Summarize your task",
        icon: FileText,
        prompt: "Give me a concise summary of my current task.",
    },
    {
        title: "New Plan",
        description: "Create an actionable plan",
        icon: ListTodo,
        prompt: "Help me create a clear step-by-step plan for my task.",
    },
    {
        title: "Find Work",
        description: "Analyze what needs attention",
        icon: Search,
        prompt: "Help me identify what work I should prioritize next.",
    },
    {
        title: "Optimize Workflow",
        description: "Improve my workflow",
        icon: WandSparkles,
        prompt: "Analyze my workflow and suggest ways to make it more efficient.",
    },
];

export const ChatView = () => {
    const {
        messages,
        isStreaming,
        selectedModel,
        setSelectedModel,
        sendMessage,
        stopStreaming,
        clearMessages,
    } = useAIChat();

    const [mode, setMode] = useState<AIMode>("ask");

    const hasMessages = messages.length > 0;

    const selectedModelData = useMemo(
        () =>
            AVAILABLE_MODELS.find(
                (model) => model.id === selectedModel
            ) ?? AVAILABLE_MODELS[0],
        [selectedModel]
    );

    const handleQuickAction = (prompt: string) => {
        sendMessage(prompt);
    };

    const handleNewConversation = () => {
        if (isStreaming) {
            stopStreaming();
        }

        clearMessages();
        setMode("ask");
    };

    return (
        <div className="relative flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
            {/* Top gradient hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-50 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-280px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/[0.035] blur-[120px]" />

                <div className="absolute bottom-[-300px] left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/[0.025] blur-[130px]" />
            </div>

            {/* Small memory indicator */}
            <div className="absolute right-5 top-4 z-30 hidden items-center gap-1.5 text-[10px] text-zinc-600 sm:flex">
                <CheckCircle2 className="h-3 w-3" />
                Memory
            </div>

            <AnimatePresence mode="wait">
                {!hasMessages ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 flex h-full w-full flex-col items-center overflow-y-auto px-4"
                    >
                        <div className="flex min-h-full w-full max-w-2xl flex-col items-center justify-center pb-12 pt-16">
                            {/* Brand */}
                            <div className="mb-8 flex items-center gap-2.5">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl" />

                                    <img
                                        src={relayAiLogo}
                                        alt="RelayAI"
                                        className="relative h-10 w-10 object-contain"
                                    />
                                </div>

                                <div className="text-[27px] font-semibold tracking-[-0.04em] text-zinc-100">
                                    Relay
                                    <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                                        AI
                                    </span>
                                </div>
                            </div>

                            {/* Mode selector */}
                            <div className="mb-[-1px] flex items-end self-start pl-5">
                                <button
                                    type="button"
                                    onClick={() => setMode("ask")}
                                    className={`relative z-10 flex items-center gap-1.5 rounded-t-xl px-4 py-2 text-[11px] transition ${
                                        mode === "ask"
                                            ? "bg-[#171717] text-white"
                                            : "text-zinc-600 hover:text-zinc-400"
                                    }`}
                                >
                                    <MessageSquare className="h-3 w-3" />
                                    Ask
                                </button>

                                {/* <button
                                    type="button"
                                    onClick={() => setMode("agents")}
                                    className={`flex items-center gap-1.5 rounded-t-xl px-4 py-2 text-[11px] transition ${
                                        mode === "agents"
                                            ? "bg-[#171717] text-white"
                                            : "text-zinc-600 hover:text-zinc-400"
                                    }`}
                                >
                                    <BotIcon />
                                    Agents
                                </button> */}
                            </div>

                            {/* Main composer */}
                            <div className="w-full">
                                <ChatPromptInput
                                    selectedModel={selectedModel}
                                    onModelChange={setSelectedModel}
                                    onSend={sendMessage}
                                    onStop={stopStreaming}
                                    isStreaming={isStreaming}
                                />
                            </div>

                            {/* Quick actions */}
                            <div className="mt-5 grid w-full grid-cols-2 gap-1.5 sm:grid-cols-4">
                                {QUICK_ACTIONS.map((action, index) => {
                                    const Icon = action.icon;

                                    return (
                                        <motion.button
                                            key={action.title}
                                            type="button"
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    0.05 +
                                                    index * 0.04,
                                            }}
                                            onClick={() =>
                                                handleQuickAction(
                                                    action.prompt
                                                )
                                            }
                                            className="group rounded-xl border border-white/[0.045] bg-[#111111] px-3 py-3 text-left transition duration-200 hover:border-white/[0.09] hover:bg-[#151515]"
                                        >
                                            <Icon className="mb-2 h-3.5 w-3.5 text-zinc-500 transition group-hover:text-zinc-300" />

                                            <p className="text-[10px] font-medium text-zinc-300">
                                                {action.title}
                                            </p>

                                            <p className="mt-0.5 line-clamp-1 text-[9px] text-zinc-600">
                                                {action.description}
                                            </p>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Bottom skill promotion */}
                            <div className="mt-16 flex w-full items-center gap-3 border-t border-white/[0.035] pt-5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02]">
                                    <Sparkles className="h-3.5 w-3.5 text-zinc-500" />
                                </div>

                                <div>
                                    <p className="text-[11px] text-zinc-400">
                                        Create Skills for RelayAI
                                        <span className="ml-1.5 rounded bg-violet-500/10 px-1.5 py-0.5 text-[8px] text-violet-400">
                                            New
                                        </span>
                                    </p>

                                    <p className="mt-0.5 text-[9px] text-zinc-700">
                                        Turn your expertise into reusable AI
                                        workflows.
                                    </p>
                                </div>

                                <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-700" />
                            </div>

                            {mode === "agents" && (
                                <p className="mt-4 text-center text-[9px] text-zinc-700">
                                    Agent workspace UI is ready — execution
                                    can be connected to your agent backend
                                    next.
                                </p>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="conversation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 flex h-full w-full flex-col"
                    >
                        {/* Conversation top bar */}
                        <div className="flex h-12 shrink-0 items-center px-3 sm:px-5">
                            <button
                                type="button"
                                onClick={handleNewConversation}
                                className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[10px] text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-300"
                            >
                                <Plus className="h-3 w-3" />
                                New Conversation
                            </button>

                            <div className="mx-auto hidden items-center gap-2 sm:flex">
                                <img
                                    src={relayAiLogo}
                                    alt="RelayAI"
                                    className="h-4 w-4 object-contain"
                                />

                                <span className="text-[11px] text-zinc-500">
                                    RelayAI
                                </span>

                                <span className="text-zinc-800">/</span>

                                <span className="text-[11px] text-zinc-600">
                                    {selectedModelData.shortName}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="mx-auto w-full max-w-2xl px-4 pb-48 pt-8 sm:px-8">
                                <div className="space-y-8">
                                    {messages.map((message) => (
                                        <ChatMessage
                                            key={message.id}
                                            message={message}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom composer */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent px-4 pb-5 pt-20">
                            <div className="pointer-events-auto mx-auto w-full max-w-2xl">
                                <ChatPromptInput
                                    selectedModel={selectedModel}
                                    onModelChange={setSelectedModel}
                                    onSend={sendMessage}
                                    onStop={stopStreaming}
                                    isStreaming={isStreaming}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// const BotIcon = () => {
//     return (
//         <span className="flex h-3 w-3 items-center justify-center text-[8px]">
//             ◉
//         </span>
//     );
// };