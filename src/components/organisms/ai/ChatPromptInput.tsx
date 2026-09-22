import {
    ArrowUp,
    Bot,
    Mic,
    Plus,
    Sparkles,
    Square,
    Wrench,
} from "lucide-react";
import {
    type FormEvent,
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

    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        submit();
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
        }
    };

    const hasText = value.trim().length > 0;

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div
                className={`
                    group relative rounded-[22px] p-[1px]
                    transition-all duration-500
                    ${
                        hasText
                            ? "shadow-[0_0_45px_rgba(99,102,241,0.12)]"
                            : ""
                    }
                `}
            >
                {/* Animated border */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
                    <div className="absolute -inset-[150%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_90deg,#27272a,#2563eb,#9333ea,#ec4899,#27272a)] opacity-50 blur-[1px]" />
                </div>

                {/* Inner surface */}
                <div className="relative rounded-[21px] bg-[#171717]">
                    <div className="px-4 pt-3">
                        <textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(event) =>
                                setValue(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            disabled={disabled || isStreaming}
                            rows={1}
                            placeholder={
                                isStreaming
                                    ? "RelayAI is thinking..."
                                    : "Tell AI what to do next"
                            }
                            className="
                                block
                                max-h-[180px]
                                min-h-[52px]
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

                    <div className="flex items-center justify-between px-2.5 pb-2.5">
                        {/* Left controls */}
                        <div className="relative flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() =>
                                    setSkillsOpen((value) => !value)
                                }
                                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-200"
                            >
                                <Plus className="h-3.5 w-3.5" />

                                <Wrench className="h-3 w-3" />

                                <span>Skills</span>
                            </button>

                            {skillsOpen && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Close skills"
                                        className="fixed inset-0 z-40 cursor-default"
                                        onClick={() =>
                                            setSkillsOpen(false)
                                        }
                                    />

                                    <div className="absolute bottom-full left-0 z-50 mb-2 w-60 rounded-xl border border-white/[0.08] bg-[#171717] p-1.5 shadow-2xl shadow-black/50">
                                        <div className="px-2.5 py-2">
                                            <p className="text-[11px] font-medium text-white">
                                                Skills
                                            </p>
                                            <p className="mt-0.5 text-[10px] text-zinc-500">
                                                Give RelayAI extra capabilities.
                                            </p>
                                        </div>

                                        {[
                                            {
                                                icon: Sparkles,
                                                title: "Brainstorm",
                                            },
                                            {
                                                icon: Bot,
                                                title: "Analyze",
                                            },
                                            {
                                                icon: Wrench,
                                                title: "Debug",
                                            },
                                        ].map((skill) => {
                                            const SkillIcon = skill.icon;

                                            return (
                                                <button
                                                    key={skill.title}
                                                    type="button"
                                                    onClick={() => {
                                                        setValue(
                                                            (current) =>
                                                                current
                                                                    ? `${current} ${skill.title}`
                                                                    : skill.title
                                                        );
                                                        setSkillsOpen(false);
                                                        textareaRef.current?.focus();
                                                    }}
                                                    className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition hover:bg-white/[0.05]"
                                                >
                                                    <SkillIcon className="h-3.5 w-3.5 text-zinc-400" />
                                                    <span className="text-[11px] text-zinc-300">
                                                        {skill.title}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right controls */}
                        <div className="flex items-center gap-1">
                            <ChatModelSelector
                                selectedModel={selectedModel}
                                onModelChange={onModelChange}
                            />

                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-200"
                                title="Voice input"
                            >
                                <Mic className="h-4 w-4" />
                            </button>

                            {isStreaming ? (
                                <button
                                    type="button"
                                    onClick={onStop}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                                    title="Stop"
                                >
                                    <Square className="h-3 w-3 fill-current" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!hasText || disabled}
                                    className="
                                        flex h-8 w-8 items-center justify-center
                                        rounded-full
                                        bg-gradient-to-br
                                        from-blue-400
                                        via-violet-500
                                        to-pink-500
                                        text-white
                                        shadow-lg
                                        shadow-violet-500/20
                                        transition-all
                                        duration-200
                                        hover:scale-105
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                        disabled:hover:scale-100
                                    "
                                    title="Send"
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-2 text-center text-[9px] text-zinc-700">
                RelayAI can make mistakes. Check important information.
            </p>
        </form>
    );
};