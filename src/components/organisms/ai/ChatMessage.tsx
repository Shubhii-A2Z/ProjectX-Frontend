import {
    Check,
    Copy,
    MoreHorizontal,
    RefreshCcw,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
    User as UserIcon
} from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

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
    onRegenerate?: () => void;
}

export const ChatMessage: React.FC<
    ChatMessageProps
> = ({
    message,
    onRegenerate
}) => {
    const isUser =
        message.role === "user";

    const [copied, setCopied] =
        useState(false);

    const [feedback, setFeedback] =
        useState<
            "like" | "dislike" | null
        >(null);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(
            message.content
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleFeedback = (
        type: "like" | "dislike"
    ) => {
        setFeedback((current) =>
            current === type
                ? null
                : type
        );
    };

    return (
        <div
            className={cn(
                "group flex w-full gap-3.5 py-5",
                isUser
                    ? "justify-end"
                    : "justify-start"
            )}
        >
            {/* RelayAI Avatar */}
            {!isUser && (
                <div
                    className="
                        flex size-8 shrink-0
                        items-center justify-center
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
            )}

            {/* Message */}
            <div
                className={cn(
                    "flex min-w-0 flex-col",
                    "max-w-[85%] md:max-w-[75%]",
                    isUser
                        ? "items-end"
                        : "items-start"
                )}
            >
                {isUser ? (
                    /* USER MESSAGE */
                    <div
                        className="
                            rounded-2xl
                            rounded-tr-sm
                            bg-primary
                            px-4 py-2.5
                            text-sm
                            leading-relaxed
                            text-primary-foreground
                            shadow-sm
                            whitespace-pre-wrap
                            break-words
                        "
                    >
                        {message.content}
                    </div>
                ) : (
                    /* AI MESSAGE */
                    <div className="w-full">
                        {/* THINKING STATE */}
                        {message.isStreaming &&
                            !message.content && (
                                <div
                                    className="
                                        flex items-center
                                        gap-2
                                        py-2
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    <Sparkles
                                        className="
                                            size-4
                                            animate-pulse
                                            text-purple-400
                                        "
                                    />

                                    <span>
                                        RelayAI is thinking
                                    </span>

                                    <span className="flex gap-1">
                                        <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" />

                                        <span
                                            className="
                                                size-1.5
                                                rounded-full
                                                bg-muted-foreground
                                                animate-bounce
                                                [animation-delay:150ms]
                                            "
                                        />

                                        <span
                                            className="
                                                size-1.5
                                                rounded-full
                                                bg-muted-foreground
                                                animate-bounce
                                                [animation-delay:300ms]
                                            "
                                        />
                                    </span>
                                </div>
                            )}

                        {/* RESPONSE */}
                        {message.content && (
                            <div
                                className="
                                    prose
                                    prose-sm
                                    dark:prose-invert
                                    max-w-none
                                    text-sm
                                    leading-relaxed
                                    overflow-x-auto
                                "
                            >
                                <ReactMarkdown
                                    remarkPlugins={[
                                        remarkGfm
                                    ]}
                                    components={{
                                        code({
                                            className,
                                            children,
                                            ...props
                                        }) {
                                            const match =
                                                /language-(\w+)/.exec(
                                                    className ||
                                                        ""
                                                );

                                            const isInline =
                                                !match &&
                                                !String(
                                                    children
                                                ).includes(
                                                    "\n"
                                                );

                                            if (
                                                isInline
                                            ) {
                                                return (
                                                    <code
                                                        className="
                                                            rounded
                                                            bg-muted
                                                            px-1.5
                                                            py-0.5
                                                            font-mono
                                                            text-[13px]
                                                            text-purple-300
                                                        "
                                                        {...props}
                                                    >
                                                        {
                                                            children
                                                        }
                                                    </code>
                                                );
                                            }

                                            return (
                                                <div
                                                    className="
                                                        my-3
                                                        overflow-hidden
                                                        rounded-xl
                                                        border
                                                        border-border/70
                                                        bg-muted/40
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            border-b
                                                            border-border/50
                                                            bg-muted/70
                                                            px-3
                                                            py-1.5
                                                            font-mono
                                                            text-[11px]
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        <span>
                                                            {match
                                                                ? match[1]
                                                                : "code"}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    String(
                                                                        children
                                                                    )
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                cursor-pointer
                                                                items-center
                                                                gap-1
                                                                transition-colors
                                                                hover:text-foreground
                                                            "
                                                        >
                                                            <Copy className="size-3" />

                                                            <span>
                                                                Copy
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <pre
                                                        className="
                                                            overflow-x-auto
                                                            bg-background/60
                                                            p-3.5
                                                            font-mono
                                                            text-[13px]
                                                            leading-normal
                                                        "
                                                    >
                                                        <code>
                                                            {
                                                                children
                                                            }
                                                        </code>
                                                    </pre>
                                                </div>
                                            );
                                        },

                                        p({
                                            children
                                        }) {
                                            return (
                                                <p className="mb-2 last:mb-0">
                                                    {
                                                        children
                                                    }
                                                </p>
                                            );
                                        },

                                        ul({
                                            children
                                        }) {
                                            return (
                                                <ul className="my-2 list-disc space-y-1 pl-5">
                                                    {
                                                        children
                                                    }
                                                </ul>
                                            );
                                        },

                                        ol({
                                            children
                                        }) {
                                            return (
                                                <ol className="my-2 list-decimal space-y-1 pl-5">
                                                    {
                                                        children
                                                    }
                                                </ol>
                                            );
                                        },

                                        table({
                                            children
                                        }) {
                                            return (
                                                <div className="my-3 overflow-x-auto rounded-lg border border-border">
                                                    <table className="w-full border-collapse text-left text-xs">
                                                        {
                                                            children
                                                        }
                                                    </table>
                                                </div>
                                            );
                                        },

                                        th({
                                            children
                                        }) {
                                            return (
                                                <th className="border-b border-border bg-muted/50 p-2 font-medium">
                                                    {
                                                        children
                                                    }
                                                </th>
                                            );
                                        },

                                        td({
                                            children
                                        }) {
                                            return (
                                                <td className="border-b border-border/40 p-2">
                                                    {
                                                        children
                                                    }
                                                </td>
                                            );
                                        }
                                    }}
                                >
                                    {
                                        message.content
                                    }
                                </ReactMarkdown>
                            </div>
                        )}

                        {/* STREAMING INDICATOR */}
                        {message.isStreaming &&
                            message.content && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />

                                    <span>
                                        Generating response...
                                    </span>
                                </div>
                            )}

                        {/* ACTION BAR */}
                        {message.content &&
                            !message.isStreaming && (
                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-1
                                        opacity-0
                                        transition-opacity
                                        group-hover:opacity-100
                                    "
                                >
                                    {/* COPY */}
                                    <button
                                        type="button"
                                        onClick={
                                            handleCopy
                                        }
                                        className="
                                            flex
                                            cursor-pointer
                                            items-center
                                            gap-1
                                            rounded-md
                                            px-2
                                            py-1
                                            text-[11px]
                                            text-muted-foreground
                                            transition-colors
                                            hover:bg-muted
                                            hover:text-foreground
                                        "
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="size-3 text-emerald-400" />

                                                <span className="text-emerald-400">
                                                    Copied
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="size-3" />

                                                <span>
                                                    Copy
                                                </span>
                                            </>
                                        )}
                                    </button>

                                    {/* LIKE */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFeedback(
                                                "like"
                                            )
                                        }
                                        className={cn(
                                            "cursor-pointer rounded-md p-1.5 transition-colors",
                                            feedback ===
                                                "like"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                        title="Good response"
                                    >
                                        <ThumbsUp className="size-3.5" />
                                    </button>

                                    {/* DISLIKE */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFeedback(
                                                "dislike"
                                            )
                                        }
                                        className={cn(
                                            "cursor-pointer rounded-md p-1.5 transition-colors",
                                            feedback ===
                                                "dislike"
                                                ? "bg-red-500/10 text-red-400"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                        title="Bad response"
                                    >
                                        <ThumbsDown className="size-3.5" />
                                    </button>

                                    {/* REGENERATE */}
                                    {onRegenerate && (
                                        <button
                                            type="button"
                                            onClick={
                                                onRegenerate
                                            }
                                            className="
                                                cursor-pointer
                                                rounded-md
                                                p-1.5
                                                text-muted-foreground
                                                transition-colors
                                                hover:bg-muted
                                                hover:text-foreground
                                            "
                                            title="Regenerate response"
                                        >
                                            <RefreshCcw className="size-3.5" />
                                        </button>
                                    )}

                                    {/* MORE */}
                                    <button
                                        type="button"
                                        className="
                                            cursor-pointer
                                            rounded-md
                                            p-1.5
                                            text-muted-foreground
                                            transition-colors
                                            hover:bg-muted
                                            hover:text-foreground
                                        "
                                        title="More options"
                                    >
                                        <MoreHorizontal className="size-3.5" />
                                    </button>
                                </div>
                            )}
                    </div>
                )}
            </div>

            {/* USER AVATAR */}
            {isUser && (
                <div
                    className="
                        flex size-8 shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-border/80
                        bg-secondary
                        text-muted-foreground
                        shadow-sm
                    "
                >
                    <UserIcon className="size-4" />
                </div>
            )}
        </div>
    );
};