import { Check, Copy, Sparkles, User as UserIcon } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

import { ChatReasoning } from "./ChatReasoning";

export interface ChatMessageItem {
    id: string;
    role: "user" | "assistant";
    content: string;
    reasoning?: string;
    isStreaming?: boolean;
    duration?: number;
    model?: string;
}

interface ChatMessageProps {
    message: ChatMessageItem;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === "user";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={cn(
                "group flex w-full gap-3.5 py-4 transition-colors",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {/* Assistant Avatar */}
            {!isUser && (
                <div className="size-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20 text-white mt-0.5">
                    <Sparkles className="size-4" />
                </div>
            )}

            {/* Message Body */}
            <div
                className={cn(
                    "flex flex-col min-w-0 max-w-[85%] md:max-w-[75%]",
                    isUser ? "items-end" : "items-start"
                )}
            >
                {/* User Message Bubble */}
                {isUser ? (
                    <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-primary-foreground text-sm shadow-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </div>
                ) : (
                    /* Assistant Message */
                    <div className="w-full space-y-2">
                        {/* Reasoning / Chain of Thought Block */}
                        {message.reasoning !== undefined && (
                            <ChatReasoning
                                reasoning={message.reasoning}
                                isStreaming={message.isStreaming && !message.content}
                                duration={message.duration}
                            />
                        )}

                        {/* Content Markdown */}
                        {message.content ? (
                            <div className="prose prose-invert prose-sm max-w-none text-foreground text-sm leading-relaxed overflow-x-auto space-y-3">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            const isInline = !match && !String(children).includes("\n");

                                            if (isInline) {
                                                return (
                                                    <code className="bg-muted px-1.5 py-0.5 rounded text-[13px] font-mono text-purple-300" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }

                                            return (
                                                <div className="my-3 rounded-xl border border-border/70 bg-muted/40 overflow-hidden not-prose">
                                                    <div className="flex items-center justify-between px-3 py-1.5 bg-muted/70 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
                                                        <span>{match ? match[1] : "code"}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => navigator.clipboard.writeText(String(children))}
                                                            className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                                                        >
                                                            <Copy className="size-3" />
                                                            <span>Copy</span>
                                                        </button>
                                                    </div>
                                                    <pre className="p-3.5 overflow-x-auto text-[13px] font-mono leading-normal bg-background/60">
                                                        <code>{children}</code>
                                                    </pre>
                                                </div>
                                            );
                                        },
                                        p({ children }) {
                                            return <p className="mb-2 last:mb-0">{children}</p>;
                                        },
                                        ul({ children }) {
                                            return <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>;
                                        },
                                        ol({ children }) {
                                            return <ol className="list-decimal pl-5 my-2 space-y-1">{children}</ol>;
                                        },
                                        table({ children }) {
                                            return (
                                                <div className="overflow-x-auto my-3 border border-border rounded-lg">
                                                    <table className="w-full text-left text-xs border-collapse">{children}</table>
                                                </div>
                                            );
                                        },
                                        th({ children }) {
                                            return <th className="border-b border-border bg-muted/50 p-2 font-medium">{children}</th>;
                                        },
                                        td({ children }) {
                                            return <td className="border-b border-border/40 p-2">{children}</td>;
                                        }
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        ) : message.isStreaming ? (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground py-1">
                                <span className="size-2 rounded-full bg-primary animate-pulse" />
                                <span>Generating response...</span>
                            </div>
                        ) : null}

                        {/* Assistant Actions Toolbar */}
                        {message.content && !message.isStreaming && (
                            <div className="flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="size-3 text-emerald-400" />
                                            <span className="text-emerald-400">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="size-3" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="size-8 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0 text-muted-foreground shadow-sm mt-0.5">
                    <UserIcon className="size-4" />
                </div>
            )}
        </div>
    );
};

