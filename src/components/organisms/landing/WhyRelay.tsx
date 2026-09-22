import { ArrowUpRight, Check, MessageCircle, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

import { LANDING_CONFIG } from "./landing.data";

export const WhyRelay = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
    });

    const { whyRelay } = LANDING_CONFIG;

    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = whyRelay.items[activeIndex];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative overflow-hidden border-t border-border/40 py-28 sm:py-36"
        >
            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[20%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                {/* =================================================
                    SECTION INTRO
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
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                        {whyRelay.eyebrow}
                    </div>

                    <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                        {whyRelay.title}
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                        {whyRelay.description}
                    </p>
                </motion.div>

                {/* =================================================
                    MAIN EXPERIENCE
                ================================================= */}

                <div className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                    {/* =============================================
                        LEFT — INTERACTIVE ITEMS
                    ============================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -25,
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
                            duration: 0.7,
                            delay: 0.15,
                        }}
                        className="rounded-3xl border border-border/60 bg-background/70 p-3 shadow-xl shadow-black/[0.03] backdrop-blur-xl"
                    >
                        <div className="mb-2 px-4 py-3">
                            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                The Relay approach
                            </span>
                        </div>

                        <div className="space-y-1">
                            {whyRelay.items.map(
                                (item, index) => {
                                    const Icon = item.icon;
                                    const isActive =
                                        activeIndex === index;

                                    return (
                                        <motion.button
                                            key={item.title}
                                            type="button"
                                            onClick={() =>
                                                setActiveIndex(
                                                    index
                                                )
                                            }
                                            whileHover={{
                                                x: isActive
                                                    ? 0
                                                    : 3,
                                            }}
                                            className={`group relative w-full overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${
                                                isActive
                                                    ? "bg-muted/70"
                                                    : "hover:bg-muted/40"
                                            }`}
                                        >
                                            {/* Active indicator */}
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    opacity:
                                                        isActive
                                                            ? 1
                                                            : 0,
                                                }}
                                                className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                                            />

                                            <div className="flex gap-4">
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                                                        isActive
                                                            ? "border-primary/20 bg-primary/10 text-primary"
                                                            : "border-border/60 bg-background text-muted-foreground group-hover:text-foreground"
                                                    }`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <h3
                                                            className={`text-sm font-semibold transition-colors ${
                                                                isActive
                                                                    ? "text-foreground"
                                                                    : "text-foreground/75"
                                                            }`}
                                                        >
                                                            {
                                                                item.title
                                                            }
                                                        </h3>

                                                        <ArrowUpRight
                                                            className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                                                                isActive
                                                                    ? "translate-x-0 -translate-y-0 text-primary opacity-100"
                                                                    : "translate-y-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-70"
                                                            }`}
                                                        />
                                                    </div>

                                                    <p
                                                        className={`mt-1.5 text-xs leading-5 transition-colors ${
                                                            isActive
                                                                ? "text-muted-foreground"
                                                                : "text-muted-foreground/70"
                                                        }`}
                                                    >
                                                        {
                                                            item.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                }
                            )}
                        </div>
                    </motion.div>

                    {/* =============================================
                        RIGHT — VISUAL STORY
                    ============================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 25,
                            scale: 0.98,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      x: 0,
                                      scale: 1,
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                        }}
                        className="relative min-h-[500px] overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-2xl shadow-black/[0.05] backdrop-blur-xl"
                    >
                        {/* Visual gradient */}
                        <motion.div
                            key={activeIndex}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="absolute inset-0"
                        >
                            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />

                            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />
                        </motion.div>

                        {/* Grid */}
                        <div
                            className="absolute inset-0 opacity-[0.035]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                            }}
                        />

                        {/* Content */}
                        <div className="relative flex h-full min-h-[500px] flex-col justify-between p-6 sm:p-8">
                            {/* Top */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/80">
                                        <span className="text-xs font-bold text-primary">
                                            R
                                        </span>
                                    </div>

                                    <span className="text-xs font-medium text-muted-foreground">
                                        Relay workspace
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-2.5 py-1.5 backdrop-blur-xl">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                    <span className="text-[10px] font-medium text-muted-foreground">
                                        Connected
                                    </span>
                                </div>
                            </div>

                            {/* Center visualization */}
                            <div className="relative flex flex-1 items-center justify-center py-12">
                                {/* Orbit rings */}
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 35,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute h-72 w-72 rounded-full border border-border/40"
                                />

                                <motion.div
                                    animate={{
                                        rotate: -360,
                                    }}
                                    transition={{
                                        duration: 25,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute h-52 w-52 rounded-full border border-primary/10"
                                />

                                <div className="absolute h-36 w-36 rounded-full bg-primary/10 blur-3xl" />

                                {/* Connection lines */}
                                <div className="absolute h-px w-64 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                                <div className="absolute h-64 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

                                {/* Center */}
                                <motion.div
                                    key={activeIndex}
                                    initial={{
                                        scale: 0.85,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                    className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-primary/20 bg-background/90 shadow-2xl shadow-primary/10 backdrop-blur-xl"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                        <activeItem.icon className="h-5 w-5 text-primary" />
                                    </div>

                                    <span className="mt-2 text-[11px] font-semibold">
                                        {activeItem.title}
                                    </span>
                                </motion.div>

                                {/* Floating nodes */}
                                <FloatingNode
                                    className="left-[8%] top-[25%]"
                                    delay={0}
                                >
                                    <MessageCircle className="h-4 w-4" />
                                </FloatingNode>

                                <FloatingNode
                                    className="right-[8%] top-[22%]"
                                    delay={0.4}
                                >
                                    <Users className="h-4 w-4" />
                                </FloatingNode>

                                <FloatingNode
                                    className="bottom-[20%] left-[18%]"
                                    delay={0.8}
                                >
                                    <Check className="h-4 w-4" />
                                </FloatingNode>

                                <FloatingNode
                                    className="bottom-[17%] right-[18%]"
                                    delay={1.2}
                                >
                                    <ZapIcon />
                                </FloatingNode>
                            </div>

                            {/* Bottom insight */}
                            <motion.div
                                key={`description-${activeIndex}`}
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                }}
                                className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                        <activeItem.icon className="h-4 w-4 text-primary" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {activeItem.title}
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                            {
                                                activeItem.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* =================================================
                    BOTTOM STATEMENT
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
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
                        duration: 0.6,
                        delay: 0.4,
                    }}
                    className="mx-auto mt-16 max-w-3xl text-center"
                >
                    <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                        One workspace. One shared context. Less friction.
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

/* =========================================================
   FLOATING NODE
========================================================= */

interface FloatingNodeProps {
    children: React.ReactNode;
    className: string;
    delay: number;
}

const FloatingNode = ({
    children,
    className,
    delay,
}: FloatingNodeProps) => {
    return (
        <motion.div
            className={`absolute ${className}`}
            animate={{
                y: [0, -8, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-muted-foreground shadow-lg backdrop-blur-xl">
                {children}
            </div>
        </motion.div>
    );
};

/* =========================================================
   SMALL ICON
========================================================= */

const ZapIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-11.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 9h6a1 1 0 0 1 .78 1.63l-9.9 11.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 10 14z" />
        </svg>
    );
};