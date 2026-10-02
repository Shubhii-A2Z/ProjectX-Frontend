import {
    ArrowUp,
    Bot,
    Command,
    Mic,
    Plus,
    Sparkles,
    Square,
    Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
    type FormEvent,
    type KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { ChatModelSelector } from "./ChatModelSelector";

interface ChatPromptInputProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
    onSend: (message: string) => void;
    onStop: () => void;
    isStreaming: boolean;
    disabled?: boolean;
}

const SKILLS = [
    {
        id: "brainstorm",
        title: "Brainstorm",
        description: "Explore ideas and possibilities",
        icon: Sparkles,
    },
    {
        id: "analyze",
        title: "Analyze",
        description: "Break down a complex problem",
        icon: Bot,
    },
    {
        id: "debug",
        title: "Debug",
        description: "Find and fix what's wrong",
        icon: Wrench,
    },
];

export const ChatPromptInput = ({
    selectedModel,
    onModelChange,
    onSend,
    onStop,
    isStreaming,
    disabled = false,
}: ChatPromptInputProps) => {
    const [value, setValue] = useState("");
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [focused, setFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const hasText = value.trim().length > 0;
    const glowActive = focused || hasText || isStreaming;

    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.style.height = "0px";

        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            180
        )}px`;
    }, [value]);

    const submit = () => {
        const message = value.trim();

        if (!message || isStreaming || disabled) {
            return;
        }

        onSend(message);
        setValue("");

        requestAnimationFrame(() => {
            textareaRef.current?.focus();
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submit();
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                {/* =====================================================
                    AMBIENT OUTER GLOW
                    ===================================================== */}

                <AnimatePresence>
                    {glowActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pointer-events-none absolute -inset-5 overflow-hidden rounded-[34px]"
                        >
                            <motion.div
                                className="absolute inset-0 rounded-[34px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.16),rgba(34,211,238,0.08),transparent_68%)] blur-2xl"
                                animate={{
                                    scale: [0.95, 1.05, 0.95],
                                    opacity: [0.65, 1, 0.65],
                                }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* =====================================================
                    ROTATING GLOW BORDER
                    ===================================================== */}

                <div className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-[23px]">
                    <motion.div
                        className="absolute -inset-[150%] bg-[conic-gradient(from_90deg,transparent_0%,#22d3ee_18%,#6366f1_38%,#8b5cf6_52%,#3b82f6_70%,transparent_88%)]"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: isStreaming ? 4.5 : 7,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            opacity: glowActive ? 0.9 : 0.42,
                        }}
                    />
                </div>

                {/* =====================================================
                    SECONDARY SOFT LIGHT
                    ===================================================== */}

                <motion.div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]"
                    animate={{
                        opacity: glowActive ? 1 : 0.65,
                    }}
                >
                    <motion.div
                        className="absolute -left-1/4 top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[2px]"
                        animate={{
                            x: ["0%", "300%"],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    <motion.div
                        className="absolute -right-1/4 bottom-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-violet-400/80 to-transparent blur-[2px]"
                        animate={{
                            x: ["0%", "-300%"],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </motion.div>

                {/* =====================================================
                    MAIN COMPOSER
                    ===================================================== */}

                <div
                    className={`
                        relative
                        overflow-visible
                        rounded-[22px]
                        border
                        bg-[#111218]/95
                        backdrop-blur-2xl
                        transition-all
                        duration-300
                        ${
                            focused
                                ? "border-white/[0.13] shadow-[0_0_35px_rgba(99,102,241,0.10),0_18px_55px_rgba(0,0,0,0.42)]"
                                : "border-white/[0.075] shadow-[0_18px_55px_rgba(0,0,0,0.32)]"
                        }
                    `}
                >
                    {/* Inner top reflection */}
                    <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

                    {/* =================================================
                        TEXTAREA
                        ================================================= */}

                    <div className="px-4 pt-3.5">
                        <textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(event) =>
                                setValue(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            disabled={disabled || isStreaming}
                            rows={1}
                            placeholder={
                                isStreaming
                                    ? "RelayAI is working..."
                                    : "Ask RelayAI anything..."
                            }
                            className="
                                block
                                min-h-[54px]
                                max-h-[180px]
                                w-full
                                resize-none
                                overflow-y-auto
                                bg-transparent
                                text-[14px]
                                leading-6
                                text-zinc-100
                                outline-none
                                placeholder:text-zinc-600
                                disabled:cursor-not-allowed
                            "
                        />
                    </div>

                    {/* =================================================
                        TOOLBAR
                        ================================================= */}

                    <div className="flex items-center justify-between px-2.5 pb-2.5">
                        {/* LEFT */}
                        <div className="flex items-center gap-1">
                            {/* Skills */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSkillsOpen(
                                            (current) => !current
                                        )
                                    }
                                    className={`
                                        flex
                                        h-8
                                        items-center
                                        gap-1.5
                                        rounded-lg
                                        px-2.5
                                        text-[11px]
                                        font-medium
                                        transition-all
                                        ${
                                            skillsOpen
                                                ? "bg-white/[0.07] text-zinc-200"
                                                : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300"
                                        }
                                    `}
                                >
                                    <Plus className="size-3.5" />

                                    <span>Skills</span>
                                </button>

                                <AnimatePresence>
                                    {skillsOpen && (
                                        <>
                                            {/* Backdrop */}
                                            <motion.button
                                                type="button"
                                                aria-label="Close skills"
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
                                                    setSkillsOpen(false)
                                                }
                                                className="fixed inset-0 z-40 cursor-default"
                                            />

                                            {/* Skills menu */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                    scale: 0.96,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 5,
                                                    scale: 0.98,
                                                }}
                                                transition={{
                                                    duration: 0.16,
                                                }}
                                                className="
                                                    absolute
                                                    bottom-full
                                                    left-0
                                                    z-50
                                                    mb-2
                                                    w-64
                                                    overflow-hidden
                                                    rounded-2xl
                                                    border
                                                    border-white/[0.08]
                                                    bg-[#14151b]/98
                                                    p-1.5
                                                    shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                                                    backdrop-blur-2xl
                                                "
                                            >
                                                <div className="px-2.5 py-2.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-500/10">
                                                            <Wrench className="size-3.5 text-violet-300" />
                                                        </div>

                                                        <div>
                                                            <p className="text-[11px] font-semibold text-zinc-200">
                                                                Skills
                                                            </p>

                                                            <p className="mt-0.5 text-[9px] text-zinc-600">
                                                                Give RelayAI a
                                                                focused ability.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-0.5">
                                                    {SKILLS.map(
                                                        (skill) => {
                                                            const SkillIcon =
                                                                skill.icon;

                                                            return (
                                                                <button
                                                                    key={
                                                                        skill.id
                                                                    }
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setValue(
                                                                            (
                                                                                current
                                                                            ) =>
                                                                                current
                                                                                    ? `${current} ${skill.title}`
                                                                                    : skill.title
                                                                        );

                                                                        setSkillsOpen(
                                                                            false
                                                                        );

                                                                        requestAnimationFrame(
                                                                            () => {
                                                                                textareaRef.current?.focus();
                                                                            }
                                                                        );
                                                                    }}
                                                                    className="
                                                                        flex
                                                                        w-full
                                                                        items-center
                                                                        gap-3
                                                                        rounded-xl
                                                                        px-2.5
                                                                        py-2.5
                                                                        text-left
                                                                        transition-all
                                                                        hover:bg-white/[0.05]
                                                                    "
                                                                >
                                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.035] ring-1 ring-white/[0.04]">
                                                                        <SkillIcon className="size-3.5 text-zinc-400" />
                                                                    </div>

                                                                    <div className="min-w-0">
                                                                        <p className="text-[11px] font-medium text-zinc-300">
                                                                            {
                                                                                skill.title
                                                                            }
                                                                        </p>

                                                                        <p className="mt-0.5 text-[9px] text-zinc-600">
                                                                            {
                                                                                skill.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Context */}
                            <button
                                type="button"
                                className="
                                    hidden
                                    h-8
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    px-2.5
                                    text-[11px]
                                    text-zinc-600
                                    transition
                                    hover:bg-white/[0.05]
                                    hover:text-zinc-300
                                    sm:flex
                                "
                                title="Add context"
                            >
                                <Command className="size-3.5" />

                                <span>Context</span>
                            </button>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-1">
                            {/* Model */}
                            <ChatModelSelector
                                selectedModel={selectedModel}
                                onModelChange={onModelChange}
                            />

                            {/* Voice */}
                            <button
                                type="button"
                                className="
                                    hidden
                                    size-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-zinc-600
                                    transition
                                    hover:bg-white/[0.05]
                                    hover:text-zinc-300
                                    sm:flex
                                "
                                title="Voice input"
                            >
                                <Mic className="size-4" />
                            </button>

                            {/* Send / Stop */}
                            {isStreaming ? (
                                <motion.button
                                    type="button"
                                    onClick={onStop}
                                    whileHover={{
                                        scale: 1.06,
                                    }}
                                    whileTap={{
                                        scale: 0.92,
                                    }}
                                    className="
                                        relative
                                        flex
                                        size-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white
                                        text-black
                                        shadow-[0_0_20px_rgba(255,255,255,0.12)]
                                    "
                                    title="Stop generation"
                                >
                                    <motion.span
                                        className="absolute inset-0 rounded-full border border-white/50"
                                        animate={{
                                            scale: [1, 1.35, 1],
                                            opacity: [0.7, 0, 0.7],
                                        }}
                                        transition={{
                                            duration: 1.6,
                                            repeat: Infinity,
                                        }}
                                    />

                                    <Square className="relative size-3 fill-current" />
                                </motion.button>
                            ) : (
                                <motion.button
                                    type="submit"
                                    disabled={!hasText || disabled}
                                    whileHover={
                                        hasText
                                            ? {
                                                  scale: 1.07,
                                              }
                                            : undefined
                                    }
                                    whileTap={
                                        hasText
                                            ? {
                                                  scale: 0.92,
                                              }
                                            : undefined
                                    }
                                    className="
                                        relative
                                        flex
                                        size-8
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-full
                                        bg-gradient-to-br
                                        from-cyan-300
                                        via-violet-500
                                        to-blue-500
                                        text-white
                                        shadow-[0_0_22px_rgba(99,102,241,0.25)]
                                        transition-all
                                        duration-200
                                        disabled:cursor-not-allowed
                                        disabled:opacity-25
                                        disabled:shadow-none
                                    "
                                    title="Send message"
                                >
                                    {hasText && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0"
                                            animate={{
                                                x: [
                                                    "-120%",
                                                    "120%",
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.8,
                                                repeat: Infinity,
                                                repeatDelay: 1.5,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}

                                    <ArrowUp className="relative size-4" />
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer hint */}
            <div className="mt-2 flex items-center justify-center gap-2 text-[9px] text-zinc-700">
                <span>RelayAI can make mistakes.</span>

                <span className="size-0.5 rounded-full bg-zinc-800" />

                <span>Enter to send</span>

                <span className="hidden size-0.5 rounded-full bg-zinc-800 sm:block" />

                <span className="hidden sm:block">Shift + Enter for new line</span>
            </div>
        </form>
    );
};