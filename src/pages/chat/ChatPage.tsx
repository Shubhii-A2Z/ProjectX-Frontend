import {
    ArrowDown,
    ChevronDown,
    Hash,
    MessageSquare,
    MoreHorizontal,
    Send,
    Smile,
    Users,
    X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
    type KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    CHAT_ACTIONS,
    CHAT_COMPOSER_ACTIONS,
    CHAT_DETAILS,
    CHAT_HEADER,
    CHAT_MEMBERS,
    CHAT_MESSAGES,
} from "@/config/chatWorkspace";
import { RELAY_MOTION } from "@/config/design";

type ChatMessage = (typeof CHAT_MESSAGES)[number];

export const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        ...CHAT_MESSAGES,
    ]);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    /*
     * --------------------------------------------------
     * Scroll helpers
     * --------------------------------------------------
     */

    const scrollToBottom = useCallback(
        (behavior: ScrollBehavior = "smooth") => {
            const container = messagesContainerRef.current;

            if (!container) {
                return;
            }

            container.scrollTo({
                top: container.scrollHeight,
                behavior,
            });
        },
        [],
    );

    /*
     * Scroll to the latest message whenever the
     * message collection changes.
     */
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            scrollToBottom("auto");
        }, 0);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [messages.length, scrollToBottom]);

    /*
     * --------------------------------------------------
     * Message handling
     * --------------------------------------------------
     */

    const sendMessage = useCallback(() => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        const currentTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        const currentUser = CHAT_MESSAGES.find(
            (chatMessage) => chatMessage.author === "You",
        );

        /*
         * We reuse the existing message structure from
         * chatWorkspace.ts so the local mock message
         * behaves exactly like the existing messages.
         */
        const newMessage = {
            id: `local-${Date.now()}`,
            author: "You",
            initials: currentUser?.initials ?? "YO",
            avatar:
                currentUser?.avatar ??
                CHAT_MESSAGES[0]?.avatar ??
                "from-cyan-500 to-blue-500",
            time: currentTime,
            content: trimmedMessage,
            reactions: [],
            replies: 0,
        } satisfies ChatMessage;

        setMessages((currentMessages) => [
            ...currentMessages,
            newMessage,
        ]);

        setMessage("");
    }, [message]);

    const handleComposerKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        /*
         * Enter = send
         * Shift + Enter = new line
         */
        if (event.key !== "Enter" || event.shiftKey) {
            return;
        }

        event.preventDefault();
        sendMessage();
    };

    /*
     * --------------------------------------------------
     * Render
     * --------------------------------------------------
     */

    return (
        <div className="flex h-full min-w-0 bg-[#07080c] text-white">
            {/* =========================================================
                MAIN CHAT AREA
            ========================================================== */}

            <div className="flex min-w-0 flex-1 flex-col">
                {/* =====================================================
                    HEADER
                ====================================================== */}

                <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-white/[0.045] text-zinc-500">
                            <Hash size={16} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="truncate text-[13px] font-semibold text-zinc-200">
                                    {CHAT_HEADER.channel}
                                </h1>

                                <ChevronDown
                                    size={13}
                                    className="shrink-0 text-zinc-700"
                                />
                            </div>

                            <p className="mt-0.5 hidden truncate text-[10px] text-zinc-600 sm:block">
                                {CHAT_HEADER.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {CHAT_ACTIONS.map((action) => {
                            const Icon = action.icon;

                            return (
                                <button
                                    key={action.id}
                                    type="button"
                                    title={action.label}
                                    className="
                                        hidden size-8 items-center
                                        justify-center rounded-lg
                                        text-zinc-600 transition-colors
                                        hover:bg-white/[0.05]
                                        hover:text-zinc-300
                                        sm:flex
                                    "
                                >
                                    <Icon size={15} />
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() =>
                                setDetailsOpen((current) => !current)
                            }
                            title="Conversation details"
                            aria-label="Toggle conversation details"
                            aria-expanded={detailsOpen}
                            className={`
                                flex size-8 items-center justify-center
                                rounded-lg transition-colors
                                ${
                                    detailsOpen
                                        ? "bg-white/[0.07] text-zinc-200"
                                        : "text-zinc-600 hover:bg-white/[0.05] hover:text-zinc-300"
                                }
                            `}
                        >
                            <Users size={15} />
                        </button>

                        <button
                            type="button"
                            title="More options"
                            aria-label="More conversation options"
                            className="
                                flex size-8 items-center
                                justify-center rounded-lg
                                text-zinc-600 transition-colors
                                hover:bg-white/[0.05]
                                hover:text-zinc-300
                            "
                        >
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                </header>

                {/* =====================================================
                    MESSAGE AREA
                ====================================================== */}

                <div
                    ref={messagesContainerRef}
                    className="relative min-h-0 flex-1 overflow-y-auto"
                >
                    <div className="mx-auto w-full max-w-[920px] px-4 pb-8 pt-6 sm:px-5">
                        {/* Date separator */}

                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/[0.05]" />

                            <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-700">
                                Today
                            </span>

                            <div className="h-px flex-1 bg-white/[0.05]" />
                        </div>

                        {/* Messages */}

                        <div className="space-y-0.5">
                            <AnimatePresence initial={false}>
                                {messages.map((chatMessage, index) => (
                                    <Message
                                        key={chatMessage.id}
                                        message={chatMessage}
                                        index={index}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Scroll to bottom */}

                    <button
                        type="button"
                        onClick={() => scrollToBottom("smooth")}
                        title="Scroll to bottom"
                        aria-label="Scroll to bottom"
                        className="
                            absolute bottom-5 right-4
                            flex size-8 items-center
                            justify-center rounded-full
                            border border-white/[0.08]
                            bg-[#15171d]
                            text-zinc-500 shadow-lg
                            transition-colors
                            hover:text-zinc-200
                            sm:right-5
                        "
                    >
                        <ArrowDown size={14} />
                    </button>
                </div>

                {/* =====================================================
                    COMPOSER
                ====================================================== */}

                <div className="shrink-0 border-t border-white/[0.06] bg-[#090a0f] p-3 sm:p-4">
                    <div className="mx-auto w-full max-w-[920px]">
                        <div
                            className="
                                overflow-hidden rounded-[14px]
                                border border-white/[0.08]
                                bg-white/[0.025]
                                transition-colors
                                focus-within:border-white/[0.14]
                                focus-within:bg-white/[0.035]
                            "
                        >
                            <textarea
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                onKeyDown={handleComposerKeyDown}
                                placeholder={`Message #${CHAT_HEADER.channel}`}
                                rows={2}
                                className="
                                    block min-h-[58px] w-full
                                    resize-none bg-transparent
                                    px-4 pt-3
                                    text-[12px] leading-5 text-zinc-300
                                    outline-none
                                    placeholder:text-zinc-700
                                "
                            />

                            <div className="flex items-center justify-between px-3 pb-2.5">
                                <div className="flex items-center gap-0.5">
                                    {CHAT_COMPOSER_ACTIONS.map((action) => {
                                        const Icon = action.icon;

                                        return (
                                            <button
                                                key={action.id}
                                                type="button"
                                                title={action.label}
                                                className={`
                                                    flex size-7
                                                    items-center justify-center
                                                    rounded-md
                                                    transition-colors
                                                    ${
                                                        action.id === "ai"
                                                            ? "text-violet-400/70 hover:bg-violet-400/[0.07] hover:text-violet-300"
                                                            : "text-zinc-600 hover:bg-white/[0.05] hover:text-zinc-300"
                                                    }
                                                `}
                                            >
                                                <Icon size={14} />
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    type="button"
                                    onClick={sendMessage}
                                    disabled={!message.trim()}
                                    title="Send message"
                                    aria-label="Send message"
                                    className="
                                        flex size-7 items-center
                                        justify-center rounded-lg
                                        bg-cyan-400 text-black
                                        transition-all
                                        hover:bg-cyan-300
                                        active:scale-95
                                        disabled:cursor-not-allowed
                                        disabled:opacity-20
                                    "
                                >
                                    <Send
                                        size={13}
                                        fill="currentColor"
                                    />
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-center text-[9px] text-zinc-800">
                            Enter to send · Shift + Enter for a new line
                        </p>
                    </div>
                </div>
            </div>

            {/* =========================================================
                DETAILS PANEL
            ========================================================== */}

            <AnimatePresence initial={false}>
                {detailsOpen && (
                    <motion.aside
                        initial={{
                            width: 0,
                            opacity: 0,
                        }}
                        animate={{
                            width: 300,
                            opacity: 1,
                        }}
                        exit={{
                            width: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: RELAY_MOTION.duration.normal,
                            ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="
                            hidden shrink-0 overflow-hidden
                            border-l border-white/[0.06]
                            bg-[#0c0d12]
                            lg:block
                        "
                    >
                        <div className="flex h-full w-[300px] flex-col">
                            {/* Panel header */}

                            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
                                <span className="text-[12px] font-semibold text-zinc-300">
                                    Conversation
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setDetailsOpen(false)}
                                    title="Close details"
                                    aria-label="Close conversation details"
                                    className="
                                        flex size-7 items-center
                                        justify-center rounded-md
                                        text-zinc-600
                                        transition-colors
                                        hover:bg-white/[0.05]
                                        hover:text-zinc-300
                                    "
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                {/* Channel information */}

                                <div className="flex flex-col items-center border-b border-white/[0.06] pb-6">
                                    <div className="flex size-14 items-center justify-center rounded-[16px] bg-white/[0.05] text-zinc-400">
                                        <Hash size={23} />
                                    </div>

                                    <h2 className="mt-3 text-[13px] font-semibold text-zinc-200">
                                        #{CHAT_HEADER.channel}
                                    </h2>

                                    <p className="mt-1 text-center text-[10px] leading-4 text-zinc-600">
                                        {CHAT_HEADER.description}
                                    </p>

                                    <span className="mt-3 rounded-full bg-white/[0.045] px-2 py-1 text-[9px] text-zinc-600">
                                        {CHAT_HEADER.members} members
                                    </span>
                                </div>

                                {/* Members */}

                                <div className="border-b border-white/[0.06] py-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600">
                                            Members
                                        </span>

                                        <span className="text-[9px] text-zinc-700">
                                            {CHAT_MEMBERS.length}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {CHAT_MEMBERS.map((member) => (
                                            <div
                                                key={member.id}
                                                className="flex items-center gap-2.5"
                                            >
                                                <div className="relative">
                                                    <div
                                                        className={`
                                                            flex size-7
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            bg-gradient-to-br
                                                            ${member.color}
                                                            text-[9px]
                                                            font-semibold
                                                            text-zinc-300
                                                        `}
                                                    >
                                                        {member.initials}
                                                    </div>

                                                    {member.online && (
                                                        <span
                                                            className="
                                                                absolute
                                                                bottom-0
                                                                right-0
                                                                size-2
                                                                rounded-full
                                                                border-2
                                                                border-[#0c0d12]
                                                                bg-emerald-400
                                                            "
                                                        />
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-[10px] font-medium text-zinc-300">
                                                        {member.name}
                                                    </p>

                                                    <p className="truncate text-[9px] text-zinc-700">
                                                        {member.status}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Resources */}

                                <div className="py-5">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600">
                                        Resources
                                    </span>

                                    <div className="mt-3 space-y-1">
                                        {CHAT_DETAILS.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    className="
                                                        flex w-full
                                                        items-center gap-3
                                                        rounded-lg px-2 py-2
                                                        text-left
                                                        transition-colors
                                                        hover:bg-white/[0.035]
                                                    "
                                                >
                                                    <Icon
                                                        size={14}
                                                        className="text-zinc-600"
                                                    />

                                                    <span className="flex-1 text-[10px] text-zinc-500">
                                                        {item.label}
                                                    </span>

                                                    <span className="text-[9px] text-zinc-700">
                                                        {item.count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};

/*
 * =============================================================
 * MESSAGE COMPONENT
 * =============================================================
 */

interface MessageProps {
    message: ChatMessage;
    index: number;
}

const Message = ({ message, index }: MessageProps) => {
    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 5,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: Math.min(index * 0.025, 0.15),
                duration: RELAY_MOTION.duration.normal,
                ease: [0.2, 0.8, 0.2, 1],
            }}
            className="
                group relative flex gap-3
                rounded-[12px] px-2 py-2.5
                transition-colors
                hover:bg-white/[0.018]
            "
        >
            {/* Avatar */}

            <div
                className={`
                    flex size-8 shrink-0
                    items-center justify-center
                    rounded-[10px]
                    bg-gradient-to-br
                    ${message.avatar}
                    text-[9px]
                    font-semibold
                    text-zinc-300
                `}
            >
                {message.initials}
            </div>

            {/* Message content */}

            <div className="min-w-0 flex-1 pr-16">
                <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-semibold text-zinc-300">
                        {message.author}
                    </span>

                    <span className="text-[9px] text-zinc-700">
                        {message.time}
                    </span>
                </div>

                <p className="mt-1 max-w-[720px] whitespace-pre-wrap break-words text-[12px] leading-6 text-zinc-500">
                    {message.content}
                </p>

                {/* Reactions / replies */}

                {(message.reactions.length > 0 ||
                    message.replies > 0) && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {message.reactions.map((reaction) => (
                            <button
                                key={`${message.id}-${reaction.emoji}`}
                                type="button"
                                className="
                                    flex items-center gap-1
                                    rounded-full border
                                    border-white/[0.06]
                                    bg-white/[0.025]
                                    px-2 py-1
                                    text-[9px] text-zinc-500
                                    transition-colors
                                    hover:border-white/[0.12]
                                    hover:bg-white/[0.05]
                                    hover:text-zinc-300
                                "
                            >
                                <span>{reaction.emoji}</span>

                                <span>{reaction.count}</span>
                            </button>
                        ))}

                        {message.replies > 0 && (
                            <button
                                type="button"
                                className="
                                    flex items-center gap-1
                                    rounded-full px-2 py-1
                                    text-[9px] font-medium
                                    text-cyan-400/70
                                    transition-colors
                                    hover:bg-cyan-400/[0.05]
                                    hover:text-cyan-300
                                "
                            >
                                <MessageSquare size={11} />

                                {message.replies}{" "}
                                {message.replies === 1
                                    ? "reply"
                                    : "replies"}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Hover actions */}

            <div
                className="
                    absolute right-2 top-1
                    hidden items-center gap-0.5
                    rounded-lg border
                    border-white/[0.07]
                    bg-[#15171d]
                    p-0.5 shadow-lg
                    group-hover:flex
                "
            >
                <button
                    type="button"
                    title="Add reaction"
                    aria-label="Add reaction"
                    className="
                        flex size-6 items-center
                        justify-center rounded
                        text-zinc-600
                        hover:bg-white/[0.06]
                        hover:text-zinc-300
                    "
                >
                    <Smile size={12} />
                </button>

                <button
                    type="button"
                    title="Reply"
                    aria-label="Reply to message"
                    className="
                        flex size-6 items-center
                        justify-center rounded
                        text-zinc-600
                        hover:bg-white/[0.06]
                        hover:text-zinc-300
                    "
                >
                    <MessageSquare size={12} />
                </button>

                <button
                    type="button"
                    title="More options"
                    aria-label="More message options"
                    className="
                        flex size-6 items-center
                        justify-center rounded
                        text-zinc-600
                        hover:bg-white/[0.06]
                        hover:text-zinc-300
                    "
                >
                    <MoreHorizontal size={12} />
                </button>
            </div>
        </motion.article>
    );
};