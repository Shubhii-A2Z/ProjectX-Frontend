import {
    // ArrowRight,
    CheckCircle2,
    Hash,
    MessageCircle,
    Users,
} from "lucide-react";
import {
    motion,
    useInView,
} from "motion/react";
import { useRef } from "react";

import { LANDING_CONFIG } from "./landing.data";

export const ProductShowcase = () => {
    const sectionRef =
        useRef<HTMLElement>(null);

    const isInView = useInView(
        sectionRef,
        {
            once: true,
            margin: "-100px",
        }
    );

    const {
        productShowcase,
    } = LANDING_CONFIG;

    return (
        <section
            id="product-showcase"
            ref={sectionRef}
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* SECTION HEADER */}
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
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        {
                            productShowcase.eyebrow
                        }
                    </div>

                    <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        {
                            productShowcase.title
                        }
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        {
                            productShowcase.description
                        }
                    </p>
                </motion.div>

                {/* PRODUCT WINDOW */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                        scale: 0.97,
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
                    {/* OUTER GLOW */}
                    <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />

                    {/* WINDOW */}
                    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
                        {/* BROWSER BAR */}
                        <div className="flex h-12 items-center gap-4 border-b bg-muted/30 px-4">
                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                            </div>

                            <div className="flex flex-1 justify-center">
                                <div className="rounded-md border bg-background/70 px-6 py-1 text-[10px] text-muted-foreground sm:px-20">
                                    {
                                        productShowcase.browserUrl
                                    }
                                </div>
                            </div>

                            <div className="w-[46px]" />
                        </div>

                        <div className="grid min-h-[570px] md:grid-cols-[210px_1fr]">
                            {/* SIDEBAR */}
                            <div className="hidden border-r bg-muted/20 p-4 md:block">
                                {/* WORKSPACE */}
                                <div className="mb-8 flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-md shadow-primary/20">
                                        {
                                            productShowcase.logoInitial
                                        }
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {
                                                productShowcase.workspaceName
                                            }
                                        </p>

                                        <p className="text-[10px] text-muted-foreground">
                                            {
                                                productShowcase.workspaceLabel
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* NAVIGATION */}
                                <div className="space-y-1">
                                    {productShowcase.navigation.map(
                                        (
                                            item,
                                            index
                                        ) => {
                                            const Icon =
                                                item.icon;

                                            return (
                                                <motion.div
                                                    key={
                                                        item.label
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
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
                                                        delay:
                                                            0.35 +
                                                            index *
                                                                0.08,
                                                    }}
                                                    className={`group flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition-all ${
                                                        item.active
                                                            ? "bg-primary/10 font-medium text-primary"
                                                            : "text-muted-foreground hover:bg-background hover:text-foreground"
                                                    }`}
                                                >
                                                    <Icon className="h-4 w-4" />

                                                    {
                                                        item.label
                                                    }
                                                </motion.div>
                                            );
                                        }
                                    )}
                                </div>

                                {/* STATUS */}
                                <div className="mt-10 rounded-xl border bg-background/60 p-3">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/50" />
                                            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                                        </span>

                                        <span className="text-[10px] font-medium">
                                            {
                                                productShowcase
                                                    .status
                                                    .label
                                            }
                                        </span>
                                    </div>

                                    <p className="mt-2 text-[10px] text-muted-foreground">
                                        {
                                            productShowcase
                                                .status
                                                .value
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* MAIN CONTENT */}
                            <div className="min-w-0 p-5 sm:p-8">
                                {/* HEADER */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            {
                                                productShowcase.greeting
                                            }
                                        </p>

                                        <h3 className="mt-1 text-xl font-semibold tracking-tight">
                                            {
                                                productShowcase.heading
                                            }
                                        </h3>
                                    </div>

                                    <div className="hidden items-center gap-2 rounded-full border bg-background px-3 py-1.5 sm:flex">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                        <span className="text-[10px] font-medium">
                                            {
                                                productShowcase.workspaceLabel
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* STATS */}
                                <div className="mt-7 grid grid-cols-3 gap-3">
                                    {productShowcase.stats.map(
                                        (
                                            stat,
                                            index
                                        ) => (
                                            <motion.div
                                                key={
                                                    stat.label
                                                }
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
                                                    delay:
                                                        0.5 +
                                                        index *
                                                            0.1,
                                                }}
                                                className="rounded-xl border bg-background/60 p-4"
                                            >
                                                <p className="text-xl font-semibold">
                                                    {
                                                        stat.value
                                                    }
                                                </p>

                                                <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                                                    {
                                                        stat.label
                                                    }
                                                </p>
                                            </motion.div>
                                        )
                                    )}
                                </div>

                                {/* RECENT CONVERSATIONS */}
                                <div className="mt-5 overflow-hidden rounded-xl border bg-background/50">
                                    <div className="flex items-center justify-between border-b px-4 py-3">
                                        <span className="text-xs font-semibold">
                                            {
                                                productShowcase.conversationsTitle
                                            }
                                        </span>

                                        <span className="text-[10px] text-muted-foreground">
                                            {productShowcase.conversationsActionLabel}
                                        </span>
                                    </div>

                                    <div className="divide-y">
                                        {productShowcase.conversations.map(
                                            (
                                                conversation,
                                                index
                                            ) => (
                                                <motion.div
                                                    key={
                                                        conversation.title
                                                    }
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
                                                        delay:
                                                            0.7 +
                                                            index *
                                                                0.12,
                                                    }}
                                                    className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/30"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                                                        {conversation.type ===
                                                        "channel" ? (
                                                            <Hash className="h-4 w-4" />
                                                        ) : (
                                                            <MessageCircle className="h-4 w-4" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-medium">
                                                            {
                                                                conversation.title
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">
                                                            {
                                                                conversation.preview
                                                            }
                                                        </p>
                                                    </div>

                                                    <span className="shrink-0 text-[10px] text-muted-foreground">
                                                        {
                                                            conversation.time
                                                        }
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* BOTTOM MESSAGE */}
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
                                        delay: 1.05,
                                    }}
                                    className="mt-5 flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/[0.04] p-4"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>

                                    <p className="text-xs leading-5 text-muted-foreground">
                                        {
                                            productShowcase.bottomMessage
                                        }
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* FLOATING PRODUCT CARD */}
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
                            delay: 1.15,
                            duration: 0.5,
                        }}
                        className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-border/60 bg-background/90 p-3 shadow-2xl backdrop-blur-xl lg:block"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Users className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold">
                                    {productShowcase.floatingCard.title}
                                </p>

                                <p className="text-[10px] text-muted-foreground">
                                    {productShowcase.floatingCard.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};