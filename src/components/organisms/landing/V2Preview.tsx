import {
    ArrowRight,
    Brain,
    // Check,
    ChevronRight,
    // Circle,
    Command,
    Sparkles,
    Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import relayAiLogo from "@/assets/relay-ai-logo.png";

import { LANDING_CONFIG } from "./landing.data";

export const V2Preview = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
    });

    const { v2Preview } = LANDING_CONFIG;

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden border-t border-border/40 py-28 sm:py-36"
        >
            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="pointer-events-none absolute inset-0">
                {/* Main glow */}
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[150px]" />

                {/* Secondary glow */}
                <div className="absolute right-[-10%] top-[10%] h-[350px] w-[350px] rounded-full bg-violet-500/[0.08] blur-[120px]" />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                {/* =================================================
                    TOP INTRO
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  y: 0,
                              }
                            : undefined
                    }
                    transition={{
                        duration: 0.7,
                    }}
                    className="mx-auto max-w-3xl text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                        }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />

                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>

                        <span className="text-xs font-semibold tracking-wide text-primary">
                            {v2Preview.badge}
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                        {v2Preview.title}
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                        {v2Preview.description}
                    </p>
                </motion.div>

                {/* =================================================
                    AI EXPERIENCE
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                        scale: 0.98,
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                              }
                            : undefined
                    }
                    transition={{
                        duration: 0.9,
                        delay: 0.15,
                        ease: "easeOut",
                    }}
                    className="relative mx-auto mt-16 max-w-6xl"
                >
                    {/* Outer glow */}
                    <div className="absolute -inset-6 rounded-[2rem] bg-primary/[0.08] blur-3xl" />

                    {/* Main window */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background/90 shadow-2xl shadow-black/[0.08] backdrop-blur-2xl">
                        {/* =================================================
                            WINDOW HEADER
                        ================================================= */}

                        <div className="flex h-14 items-center justify-between border-b border-border/50 px-4 sm:px-6">
                            {/* Left */}
                            <div className="flex items-center gap-3">
                                {/* Window controls */}
                                <div className="hidden items-center gap-1.5 sm:flex">
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                </div>

                                <div className="hidden h-5 w-px bg-border sm:block" />

                                {/* AI identity */}
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                                        <img
                                            src={relayAiLogo}
                                            alt="RelayAI"
                                            className="h-4 w-4 object-contain"
                                        />
                                    </div>

                                    <span className="text-sm font-semibold">
                                        {v2Preview.agent.name}
                                    </span>

                                    <span className="hidden rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary sm:inline-flex">
                                        Preview
                                    </span>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-2">
                                <div className="hidden items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 sm:flex">
                                    <Command className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-[10px] text-muted-foreground">
                                        K
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-2.5 py-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

                                    <span className="text-[10px] font-medium text-muted-foreground">
                                        Coming soon
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            MAIN AI BODY
                        ================================================= */}

                        <div className="grid min-h-[520px] lg:grid-cols-[0.9fr_1.1fr]">
                            {/* =================================================
                                LEFT — AGENT CONTEXT
                            ================================================= */}

                            <div className="relative overflow-hidden border-b border-border/50 p-6 lg:border-b-0 lg:border-r sm:p-8">
                                {/* Background glow */}
                                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px]" />

                                {/* Orbit */}
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
                                />

                                <motion.div
                                    animate={{
                                        rotate: -360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50"
                                />

                                {/* Center AI */}
                                <div className="relative z-10 flex min-h-[340px] items-center justify-center">
                                    <motion.div
                                        animate={{
                                            scale: [
                                                1,
                                                1.04,
                                                1,
                                            ],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="relative"
                                    >
                                        {/* Glow */}
                                        <div className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl" />

                                        {/* Core */}
                                        <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-primary/20 bg-background/90 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                                <img
                                                    src={relayAiLogo}
                                                    alt="RelayAI"
                                                    className="h-10 w-10 object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Pulse */}
                                        <motion.div
                                            animate={{
                                                scale: [
                                                    1,
                                                    1.7,
                                                ],
                                                opacity: [
                                                    0.35,
                                                    0,
                                                ],
                                            }}
                                            transition={{
                                                duration: 2.2,
                                                repeat: Infinity,
                                                ease: "easeOut",
                                            }}
                                            className="absolute inset-0 rounded-[2rem] border border-primary/30"
                                        />
                                    </motion.div>

                                    {/* Floating spark nodes */}
                                    <FloatingSpark
                                        className="left-[12%] top-[25%]"
                                        delay={0}
                                    />

                                    <FloatingSpark
                                        className="right-[12%] top-[30%]"
                                        delay={0.8}
                                    />

                                    <FloatingSpark
                                        className="bottom-[20%] left-[18%]"
                                        delay={1.4}
                                    />

                                    <FloatingSpark
                                        className="bottom-[18%] right-[20%]"
                                        delay={2}
                                    />
                                </div>

                                {/* Agent status */}
                                <div className="relative z-10 rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Brain className="h-4 w-4 text-primary" />

                                            <span className="text-xs font-semibold">
                                                {v2Preview.agent.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <motion.span
                                                animate={{
                                                    opacity: [
                                                        0.35,
                                                        1,
                                                        0.35,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                }}
                                                className="h-1.5 w-1.5 rounded-full bg-primary"
                                            />

                                            <span className="text-[10px] text-muted-foreground">
                                                {
                                                    v2Preview
                                                        .agent
                                                        .status
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* =================================================
                                RIGHT — AGENT PROCESS
                            ================================================= */}

                            <div className="flex flex-col p-6 sm:p-8">
                                {/* Heading */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                        <Sparkles className="h-3.5 w-3.5 text-primary" />

                                        Relay intelligence
                                    </div>

                                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                                        Work alongside your AI.
                                    </h3>

                                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                                        RelayAI understands the
                                        context around your workspace
                                        so assistance can happen
                                        directly where your team
                                        works.
                                    </p>
                                </div>

                                {/* Steps */}
                                <div className="mt-9 flex-1">
                                    <div className="space-y-3">
                                        {v2Preview.agent.steps.map(
                                            (
                                                step,
                                                index
                                            ) => (
                                                <AgentStep
                                                    key={step}
                                                    index={index}
                                                    label={step}
                                                    isInView={
                                                        isInView
                                                    }
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Connector */}
                                    <div className="my-6 h-px bg-border/50" />

                                    {/* Example prompt */}
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={
                                            isInView
                                                ? {
                                                      opacity: 1,
                                                      y: 0,
                                                  }
                                                : undefined
                                        }
                                        transition={{
                                            delay: 0.9,
                                            duration: 0.5,
                                        }}
                                        className="rounded-2xl border border-border/60 bg-muted/30 p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                <Zap className="h-3.5 w-3.5 text-primary" />
                                            </div>

                                            <div className="min-w-0">
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Example
                                                </span>

                                                <p className="mt-1 text-sm leading-6 text-foreground/80">
                                                    "Summarize the
                                                    latest project
                                                    discussion and
                                                    identify what
                                                    needs attention."
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Bottom */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={
                                        isInView
                                            ? {
                                                  opacity: 1,
                                              }
                                            : undefined
                                    }
                                    transition={{
                                        delay: 1.2,
                                    }}
                                    className="mt-8 flex flex-wrap items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {["S", "A", "J"].map(
                                                (initial) => (
                                                    <div
                                                        key={
                                                            initial
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[9px] font-bold text-primary"
                                                    >
                                                        {
                                                            initial
                                                        }
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <span className="text-[10px] text-muted-foreground">
                                            Built into your
                                            workspace
                                        </span>
                                    </div>

                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            x: 3,
                                        }}
                                        className="group inline-flex items-center gap-2 text-xs font-semibold"
                                    >
                                        {v2Preview.buttonLabel}

                                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        FLOATING LABEL
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      y: 0,
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 0.5,
                            delay: 1.1,
                        }}
                        className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/90 px-4 py-2 shadow-xl backdrop-blur-xl sm:flex"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />

                        <span className="text-xs font-medium text-muted-foreground">
                            The future of Relay is already taking shape.
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

/* =========================================================
   AGENT STEP
========================================================= */

interface AgentStepProps {
    index: number;
    label: string;
    isInView: boolean;
}

const AgentStep = ({
    index,
    label,
    isInView,
}: AgentStepProps) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 15,
            }}
            animate={
                isInView
                    ? {
                          opacity: 1,
                          x: 0,
                      }
                    : undefined
            }
            transition={{
                duration: 0.45,
                delay: 0.45 + index * 0.15,
            }}
            className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-border/60 hover:bg-muted/30"
        >
            {/* Number */}
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background">
                <span className="text-[10px] font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {index < 2 && (
                    <div className="absolute left-1/2 top-full h-3 w-px -translate-x-1/2 bg-border/60" />
                )}
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                    {label}
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />

                    <span className="text-[10px] text-muted-foreground">
                        Processing
                    </span>
                </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-muted-foreground" />
        </motion.div>
    );
};

/* =========================================================
   FLOATING SPARK
========================================================= */

interface FloatingSparkProps {
    className: string;
    delay: number;
}

const FloatingSpark = ({
    className,
    delay,
}: FloatingSparkProps) => {
    return (
        <motion.div
            className={`absolute ${className}`}
            animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-background/80 shadow-lg backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
        </motion.div>
    );
};