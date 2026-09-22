import {
    // Bot,
    Check,
    Copy,
    MoreHorizontal,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import relayAiLogo from "@/assets/relay-ai-logo.png";

export interface ChatMessageItem {
    id: string;
    role: "user" | "assistant";
    content: string;
    isStreaming?: boolean;
    duration?: number;
    model?: string;
}

interface ChatMessageProps {
    message: ChatMessageItem;
}

export const ChatMessage = ({
    message,
}: ChatMessageProps) => {
    const [copied, setCopied] = useState(false);

    const copyMessage = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch {
            // Clipboard may be unavailable in some environments.
        }
    };

    if (message.role === "user") {
        return (
            <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-zinc-800 text-[10px] font-medium text-zinc-300">
                    You
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-[12px] font-medium text-zinc-200">
                            You
                        </span>
                    </div>

                    <div className="whitespace-pre-wrap text-[13px] leading-6 text-zinc-300">
                        {message.content}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="group flex items-start gap-3">
            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-pink-500/20 blur-md" />

                <img
                    src={relayAiLogo}
                    alt="RelayAI"
                    className="relative h-6 w-6 object-contain"
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[12px] font-medium text-zinc-200">
                        RelayAI
                    </span>

                    <span className="text-[10px] text-zinc-600">
                        {message.model === "deep"
                            ? "Deep"
                            : "Core"}
                    </span>

                    {message.isStreaming && (
                        <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-violet-400" />
                            thinking
                        </span>
                    )}
                </div>

                <div className="prose prose-invert max-w-none text-[13px] leading-6 text-zinc-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => (
                                <p className="mb-3 last:mb-0">
                                    {children}
                                </p>
                            ),

                            ul: ({ children }) => (
                                <ul className="mb-3 ml-5 list-disc space-y-1">
                                    {children}
                                </ul>
                            ),

                            ol: ({ children }) => (
                                <ol className="mb-3 ml-5 list-decimal space-y-1">
                                    {children}
                                </ol>
                            ),

                            li: ({ children }) => (
                                <li className="pl-1">{children}</li>
                            ),

                            strong: ({ children }) => (
                                <strong className="font-semibold text-zinc-100">
                                    {children}
                                </strong>
                            ),

                            code: ({
                                inline,
                                children,
                            }: {
                                inline?: boolean;
                                children?: React.ReactNode;
                            }) => {
                                if (inline) {
                                    return (
                                        <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-zinc-200">
                                            {children}
                                        </code>
                                    );
                                }

                                return (
                                    <code className="block overflow-x-auto rounded-xl border border-white/[0.06] bg-[#101010] p-4 font-mono text-[11px] leading-5 text-zinc-300">
                                        {children}
                                    </code>
                                );
                            },

                            pre: ({ children }) => (
                                <pre className="my-3 overflow-hidden rounded-xl">
                                    {children}
                                </pre>
                            ),

                            a: ({ children, href }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-violet-400 underline underline-offset-2"
                                >
                                    {children}
                                </a>
                            ),

                            blockquote: ({ children }) => (
                                <blockquote className="my-3 border-l border-violet-500/40 pl-4 text-zinc-500">
                                    {children}
                                </blockquote>
                            ),

                            table: ({ children }) => (
                                <div className="my-3 overflow-x-auto rounded-xl border border-white/[0.06]">
                                    <table className="w-full text-left text-[11px]">
                                        {children}
                                    </table>
                                </div>
                            ),

                            th: ({ children }) => (
                                <th className="border-b border-white/[0.06] px-3 py-2 font-medium text-zinc-300">
                                    {children}
                                </th>
                            ),

                            td: ({ children }) => (
                                <td className="border-b border-white/[0.04] px-3 py-2 text-zinc-500">
                                    {children}
                                </td>
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>

                    {message.isStreaming && !message.content && (
                        <div className="flex items-center gap-1 py-2">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
                        </div>
                    )}
                </div>

                {!message.isStreaming && message.content && (
                    <div className="mt-2 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                            type="button"
                            onClick={copyMessage}
                            className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[10px] text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
                        >
                            {copied ? (
                                <Check className="h-3 w-3" />
                            ) : (
                                <Copy className="h-3 w-3" />
                            )}

                            {copied ? "Copied" : "Copy"}
                        </button>

                        <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
                        >
                            <ThumbsUp className="h-3 w-3" />
                        </button>

                        <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
                        >
                            <ThumbsDown className="h-3 w-3" />
                        </button>

                        <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
                        >
                            <MoreHorizontal className="h-3 w-3" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};