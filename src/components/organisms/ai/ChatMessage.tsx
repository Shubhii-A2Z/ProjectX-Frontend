import {
    Check,
    Copy,
    MoreHorizontal,
    RefreshCw,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode,useState } from "react";
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

type Reaction = "like" | "dislike" | null;

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const [copied, setCopied] = useState(false);
    const [reaction, setReaction] = useState<Reaction>(null);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const handleReaction = (nextReaction: Reaction) => {
        setReaction((current) =>
            current === nextReaction ? null : nextReaction
        );
    };

    if (message.role === "user") {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.22,
                }}
                className="flex items-start gap-3"
            >
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
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.24,
            }}
            className="group flex items-start gap-3"
        >
            {/* =========================================================
                RELAYAI AVATAR
                ========================================================= */}

            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-violet-500/25 to-blue-500/20 blur-md"
                    animate={{
                        opacity: message.isStreaming
                            ? [0.45, 0.9, 0.45]
                            : [0.3, 0.5, 0.3],
                        scale: message.isStreaming
                            ? [1, 1.15, 1]
                            : [1, 1.05, 1],
                    }}
                    transition={{
                        duration: message.isStreaming ? 1.8 : 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <img
                    src={relayAiLogo}
                    alt="RelayAI"
                    className="relative h-6 w-6 object-contain"
                />
            </div>

            {/* =========================================================
                MESSAGE CONTENT
                ========================================================= */}

            <div className="min-w-0 flex-1">
                {/* Header */}
                <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[12px] font-medium text-zinc-200">
                        RelayAI
                    </span>

                    <span className="rounded-md bg-white/[0.035] px-1.5 py-0.5 text-[9px] font-medium text-zinc-500 ring-1 ring-white/[0.04]">
                        {message.model === "deep" ? "Deep" : "Core"}
                    </span>

                    {message.isStreaming && (
                        <motion.span
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            className="flex items-center gap-1.5 text-[10px] text-zinc-600"
                        >
                            <motion.span
                                className="h-1 w-1 rounded-full bg-cyan-400"
                                animate={{
                                    opacity: [0.35, 1, 0.35],
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                }}
                            />

                            thinking
                        </motion.span>
                    )}
                </div>

                {/* =====================================================
                    MARKDOWN
                    ===================================================== */}

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
                                children?: ReactNode;
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
                                    className="text-violet-400 underline underline-offset-2 transition-colors hover:text-violet-300"
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

                    {/* Streaming dots */}
                    {message.isStreaming && !message.content && (
                        <div className="flex items-center gap-1 py-2">
                            {[0, 1, 2].map((dot) => (
                                <motion.span
                                    key={dot}
                                    className="h-1.5 w-1.5 rounded-full bg-zinc-500"
                                    animate={{
                                        opacity: [0.25, 1, 0.25],
                                        y: [0, -2, 0],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: dot * 0.15,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* =====================================================
                    MESSAGE ACTIONS
                    ===================================================== */}

                {!message.isStreaming && message.content && (
                    <div className="relative mt-2 flex items-center gap-1">
                        {/* Copy */}
                        <motion.button
                            type="button"
                            whileHover={{
                                y: -1,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                            onClick={copyMessage}
                            className={`
                                flex
                                h-7
                                items-center
                                gap-1.5
                                rounded-lg
                                px-2
                                text-[10px]
                                transition-all
                                ${
                                    copied
                                        ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/10"
                                        : "text-zinc-600 hover:bg-white/[0.05] hover:text-zinc-300"
                                }
                            `}
                            title="Copy response"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {copied ? (
                                    <motion.span
                                        key="check"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                    >
                                        <Check className="h-3 w-3" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {copied ? "Copied" : "Copy"}
                        </motion.button>

                        {/* Divider */}
                        <div className="mx-0.5 h-4 w-px bg-white/[0.05]" />

                        {/* Like */}
                        <motion.button
                            type="button"
                            whileHover={{
                                y: -1,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            onClick={() => handleReaction("like")}
                            className={`
                                relative
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                transition-all
                                ${
                                    reaction === "like"
                                        ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/15"
                                        : "text-zinc-600 hover:bg-white/[0.05] hover:text-zinc-300"
                                }
                            `}
                            title="Good response"
                        >
                            <ThumbsUp
                                className={`h-3.5 w-3.5 ${
                                    reaction === "like"
                                        ? "fill-current"
                                        : ""
                                }`}
                            />

                            {reaction === "like" && (
                                <motion.span
                                    layoutId={`like-indicator-${message.id}`}
                                    className="absolute -bottom-[3px] left-1/2 h-0.5 w-2 -translate-x-1/2 rounded-full bg-cyan-300"
                                />
                            )}
                        </motion.button>

                        {/* Dislike */}
                        <motion.button
                            type="button"
                            whileHover={{
                                y: -1,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            onClick={() => handleReaction("dislike")}
                            className={`
                                relative
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                transition-all
                                ${
                                    reaction === "dislike"
                                        ? "bg-rose-400/10 text-rose-300 ring-1 ring-rose-400/15"
                                        : "text-zinc-600 hover:bg-white/[0.05] hover:text-zinc-300"
                                }
                            `}
                            title="Poor response"
                        >
                            <ThumbsDown
                                className={`h-3.5 w-3.5 ${
                                    reaction === "dislike"
                                        ? "fill-current"
                                        : ""
                                }`}
                            />

                            {reaction === "dislike" && (
                                <motion.span
                                    layoutId={`dislike-indicator-${message.id}`}
                                    className="absolute -bottom-[3px] left-1/2 h-0.5 w-2 -translate-x-1/2 rounded-full bg-rose-300"
                                />
                            )}
                        </motion.button>

                        {/* More */}
                        <div className="relative">
                            <motion.button
                                type="button"
                                whileHover={{
                                    y: -1,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    setMenuOpen((current) => !current)
                                }
                                className={`
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-lg
                                    transition-all
                                    ${
                                        menuOpen
                                            ? "bg-white/[0.07] text-zinc-300"
                                            : "text-zinc-600 hover:bg-white/[0.05] hover:text-zinc-300"
                                    }
                                `}
                                title="More actions"
                            >
                                <MoreHorizontal className="h-3.5 w-3.5" />
                            </motion.button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <>
                                        <motion.button
                                            type="button"
                                            aria-label="Close menu"
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="fixed inset-0 z-40 cursor-default"
                                        />

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 5,
                                                scale: 0.96,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 4,
                                                scale: 0.97,
                                            }}
                                            transition={{
                                                duration: 0.14,
                                            }}
                                            className="
                                                absolute
                                                bottom-9
                                                left-0
                                                z-50
                                                w-44
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-white/[0.08]
                                                bg-[#15161c]/98
                                                p-1
                                                shadow-[0_18px_45px_rgba(0,0,0,0.5)]
                                                backdrop-blur-xl
                                            "
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    copyMessage();
                                                    setMenuOpen(false);
                                                }}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-2.5
                                                    rounded-lg
                                                    px-2.5
                                                    py-2
                                                    text-left
                                                    text-[10px]
                                                    text-zinc-400
                                                    transition
                                                    hover:bg-white/[0.05]
                                                    hover:text-zinc-200
                                                "
                                            >
                                                <Copy className="size-3.5" />
                                                Copy response
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMenuOpen(false)
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-2.5
                                                    rounded-lg
                                                    px-2.5
                                                    py-2
                                                    text-left
                                                    text-[10px]
                                                    text-zinc-400
                                                    transition
                                                    hover:bg-white/[0.05]
                                                    hover:text-zinc-200
                                                "
                                            >
                                                <RefreshCw className="size-3.5" />
                                                Regenerate
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};