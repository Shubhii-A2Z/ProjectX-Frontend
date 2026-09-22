import {
    ArrowRight,
    Check,
    Hash,
    MessageCircle,
    MoreHorizontal,
    Paperclip,
    Plus,
    Send,
    Smile,
    Users,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { LANDING_CONFIG } from "./landing.data";

export const Collaboration = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
    });

    const { collaboration } = LANDING_CONFIG;

    return (
        <section
            ref={sectionRef}
            id="collaboration"
            className="relative overflow-hidden border-t border-border/40 py-28 sm:py-36"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-12%] top-[20%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />

                <div className="absolute bottom-[-15%] right-[-8%] h-[360px] w-[360px] rounded-full bg-violet-500/10 blur-[120px]" />

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
                <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    {/* =====================================================
                        LEFT CONTENT
                    ===================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -30,
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
                            ease: "easeOut",
                        }}
                        className="max-w-xl"
                    >
                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                                <MessageCircle className="h-4 w-4 text-primary" />
                            </span>

                            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                                {collaboration.eyebrow}
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                            {collaboration.title}
                        </h2>

                        {/* Description */}
                        <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
                            {collaboration.description}
                        </p>

                        {/* Benefits */}
                        <div className="mt-9 space-y-4">
                            {collaboration.benefits.map(
                                (benefit, index) => (
                                    <motion.div
                                        key={benefit}
                                        initial={{
                                            opacity: 0,
                                            x: -15,
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
                                            delay:
                                                0.2 +
                                                index * 0.08,
                                        }}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                            <Check className="h-3.5 w-3.5 text-primary" />
                                        </span>

                                        <span className="text-sm font-medium text-foreground/85">
                                            {benefit}
                                        </span>
                                    </motion.div>
                                )
                            )}
                        </div>

                        {/* CTA */}
                        <motion.a
                            href="#product-showcase"
                            whileHover={{
                                x: 4,
                            }}
                            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                        >
                            {collaboration.linkLabel}

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.a>
                    </motion.div>

                    {/* =====================================================
                        CHANNEL PREVIEW
                    ===================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 35,
                            scale: 0.97,
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
                            delay: 0.1,
                            ease: "easeOut",
                        }}
                        className="relative"
                    >
                        {/* Ambient glow behind card */}
                        <div className="absolute -inset-8 rounded-[2rem] bg-primary/10 opacity-60 blur-3xl" />

                        {/* Floating status */}
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
                                duration: 0.5,
                                delay: 0.8,
                            }}
                            className="absolute -right-3 -top-5 z-20 hidden items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-xl sm:flex"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>

                            <span className="text-muted-foreground">
                                Live collaboration
                            </span>
                        </motion.div>

                        {/* Main channel window */}
                        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/90 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:shadow-black/30">
                            {/* Window header */}
                            <div className="flex h-14 items-center justify-between border-b border-border/50 px-4 sm:px-5">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Hash className="h-4 w-4 text-primary" />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="truncate text-sm font-semibold">
                                                {
                                                    collaboration
                                                        .channel
                                                        .name
                                                }
                                            </span>

                                            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:block" />

                                            <span className="hidden text-xs text-muted-foreground sm:block">
                                                {
                                                    collaboration
                                                        .channel
                                                        .members
                                                }
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 sm:hidden">
                                            <Users className="h-3 w-3 text-muted-foreground" />

                                            <span className="text-[11px] text-muted-foreground">
                                                {
                                                    collaboration
                                                        .channel
                                                        .members
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        className="hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
                                    >
                                        <Users className="h-4 w-4" />
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Channel body */}
                            <div className="relative min-h-[430px] px-4 py-5 sm:min-h-[480px] sm:px-6 sm:py-7">
                                {/* Date divider */}
                                <div className="mb-7 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-border/50" />

                                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                        Today
                                    </span>

                                    <div className="h-px flex-1 bg-border/50" />
                                </div>

                                {/* Messages */}
                                <div className="space-y-6">
                                    {collaboration.channel.messages.map(
                                        (
                                            message,
                                            index
                                        ) => (
                                            <motion.div
                                                key={`${message.author}-${message.time}`}
                                                initial={{
                                                    opacity: 0,
                                                    y: 12,
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
                                                    delay:
                                                        0.35 +
                                                        index *
                                                            0.13,
                                                }}
                                                className="group flex gap-3"
                                            >
                                                {/* Avatar */}
                                                <div className="relative shrink-0">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-violet-500/10 text-xs font-bold text-primary ring-1 ring-border/50">
                                                        {
                                                            message.initial
                                                        }
                                                    </div>

                                                    {/* Presence */}
                                                    {index ===
                                                        0 && (
                                                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
                                                    )}
                                                </div>

                                                {/* Message */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-sm font-semibold">
                                                            {
                                                                message.author
                                                            }
                                                        </span>

                                                        <span className="text-[10px] text-muted-foreground">
                                                            {
                                                                message.time
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 max-w-[90%] text-sm leading-6 text-muted-foreground">
                                                        {
                                                            message.content
                                                        }
                                                    </p>

                                                    {/* Hover actions */}
                                                    <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                        <button
                                                            type="button"
                                                            className="flex h-6 items-center gap-1 rounded-md border border-border/50 bg-background px-2 text-[10px] text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
                                                        >
                                                            <Smile className="h-3 w-3" />
                                                            React
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="flex h-6 items-center rounded-md border border-border/50 bg-background px-2 text-[10px] text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    )}
                                </div>

                                {/* Typing indicator */}
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
                                        delay: 1.25,
                                        duration: 0.5,
                                    }}
                                    className="mt-7 flex items-center gap-2"
                                >
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                                        <span className="text-[10px] font-semibold text-muted-foreground">
                                            A
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 rounded-xl bg-muted px-3 py-2">
                                        <motion.span
                                            animate={{
                                                opacity: [
                                                    0.3,
                                                    1,
                                                    0.3,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: 0,
                                            }}
                                            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                                        />

                                        <motion.span
                                            animate={{
                                                opacity: [
                                                    0.3,
                                                    1,
                                                    0.3,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: 0.2,
                                            }}
                                            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                                        />

                                        <motion.span
                                            animate={{
                                                opacity: [
                                                    0.3,
                                                    1,
                                                    0.3,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: 0.4,
                                            }}
                                            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                                        />
                                    </div>

                                    <span className="text-[10px] text-muted-foreground">
                                        Someone is typing...
                                    </span>
                                </motion.div>
                            </div>

                            {/* Composer */}
                            <div className="border-t border-border/50 bg-muted/20 p-3 sm:p-4">
                                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-2 py-2 shadow-sm transition-all duration-200 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
                                    <button
                                        type="button"
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>

                                    <span className="min-w-0 flex-1 truncate px-1 text-xs text-muted-foreground sm:text-sm">
                                        {
                                            collaboration
                                                .channel
                                                .inputPlaceholder
                                        }
                                    </span>

                                    <button
                                        type="button"
                                        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
                                    >
                                        <Paperclip className="h-4 w-4" />
                                    </button>

                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
                                    >
                                        <Send className="h-3.5 w-3.5" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom floating activity card */}
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
                                delay: 1,
                            }}
                            className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-xl md:flex"
                        >
                            <div className="flex -space-x-2">
                                {["S", "A", "J"].map(
                                    (initial) => (
                                        <div
                                            key={initial}
                                            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[9px] font-bold text-primary"
                                        >
                                            {initial}
                                        </div>
                                    )
                                )}
                            </div>

                            <div>
                                <p className="text-xs font-semibold">
                                    Team collaboration
                                </p>

                                <p className="text-[10px] text-muted-foreground">
                                    Everyone is in sync
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};