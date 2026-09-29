import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { AI_THINKING_CONFIG } from "./ai-thinking.data";

interface AIThinkingIndicatorProps {
    phaseIndex: number;
}

export const AIThinkingIndicator = ({
    phaseIndex,
}: AIThinkingIndicatorProps) => {
    const phase =
        AI_THINKING_CONFIG.phases[
            Math.min(
                phaseIndex,
                AI_THINKING_CONFIG.phases.length - 1
            )
        ];

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 6,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: -4,
            }}
            transition={{
                duration: 0.25,
            }}
            className="flex items-start gap-3.5 py-5"
        >
            {/* RelayAI avatar */}
            <div className="relative flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 shadow-md shadow-purple-500/20">
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.75, 1, 0.75],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Sparkles className="size-3.5 text-white" />
                </motion.div>

                {/* subtle glow */}
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-xl bg-violet-500/20 blur-md"
                    animate={{
                        opacity: [0.25, 0.55, 0.25],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Thinking content */}
            <div className="flex min-h-8 items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase.id}
                        initial={{
                            opacity: 0,
                            y: 5,
                            filter: "blur(3px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        exit={{
                            opacity: 0,
                            y: -5,
                            filter: "blur(3px)",
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-[12px] text-zinc-500">
                            {phase.label}
                        </span>

                        {/* animated dots */}
                        <span className="flex items-center gap-1">
                            {[0, 1, 2].map((dot) => (
                                <motion.span
                                    key={dot}
                                    className="size-1 rounded-full bg-zinc-600"
                                    animate={{
                                        opacity: [0.25, 1, 0.25],
                                        scale: [0.8, 1.15, 0.8],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: dot * 0.16,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};