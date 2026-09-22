import {
    ArrowRight,
    Check,
    Play,
    Sparkles,
} from "lucide-react";
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { LANDING_CONFIG } from "./landing.data";

export const Hero = () => {
    const navigate = useNavigate();

    const heroRef =
        useRef<HTMLElement>(null);

    const { scrollYProgress } =
        useScroll({
            target: heroRef,
            offset: ["start start", "end start"],
        });

    const previewY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 100]
    );

    const previewRotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -2]
    );

    const {
        hero,
        productShowcase,
    } = LANDING_CONFIG;

    const handleSecondaryAction =
        () => {
            document
                .getElementById(
                    hero.secondaryAction
                        .anchor
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                });
        };

    return (
        <section
            ref={heroRef}
            className="relative overflow-hidden"
        >
            {/* BACKGROUND */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

                <div className="absolute right-[-12rem] top-[12rem] h-[30rem] w-[30rem] rounded-full bg-purple-500/10 blur-[110px]" />

                <div className="absolute left-[-12rem] top-[30rem] h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[110px]" />

                {/* subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize:
                            "64px 64px",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-32">
                <div className="grid items-center gap-20 lg:grid-cols-[0.9fr_1.1fr]">
                    {/* LEFT */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                        }}
                        className="max-w-2xl"
                    >
                        {/* EYEBROW */}
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>

                            {hero.eyebrow}
                        </div>

                        {/* TITLE */}
                        <h1 className="text-5xl font-bold tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem] lg:leading-[0.98]">
                            {hero.title}

                            <span className="mt-2 block bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
                                {hero.highlightedTitle}
                            </span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                            {hero.description}
                        </p>

                        {/* ACTIONS */}
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Button
                                size="lg"
                                className="group h-12 gap-2 rounded-xl px-6 shadow-xl shadow-primary/20"
                                onClick={() =>
                                    navigate(
                                        hero
                                            .primaryAction
                                            .route
                                    )
                                }
                            >
                                {
                                    hero
                                        .primaryAction
                                        .label
                                }

                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 gap-2 rounded-xl px-6 bg-background/60 backdrop-blur"
                                onClick={
                                    handleSecondaryAction
                                }
                            >
                                <Play className="h-4 w-4 fill-current" />

                                {
                                    hero
                                        .secondaryAction
                                        .label
                                }
                            </Button>
                        </div>

                        {/* TRUST PILLS */}
                        <div className="mt-9 flex flex-wrap gap-2">
                            {hero.floatingFeatures.map(
                                (
                                    feature,
                                    index
                                ) => (
                                    <motion.div
                                        key={feature}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay:
                                                0.5 +
                                                index *
                                                    0.08,
                                        }}
                                        className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-xl"
                                    >
                                        <Check className="h-3 w-3 text-primary" />
                                        {feature}
                                    </motion.div>
                                )
                            )}
                        </div>
                    </motion.div>

                    {/* PRODUCT PREVIEW */}
                    <motion.div
                        style={{
                            y: previewY,
                            rotateX:
                                previewRotate,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.15,
                            ease: "easeOut",
                        }}
                        className="relative [perspective:1200px]"
                    >
                        {/* glow */}
                        <div className="absolute -inset-10 -z-10 rounded-[4rem] bg-gradient-to-r from-primary/20 via-purple-500/10 to-pink-500/20 blur-3xl" />

                        {/* browser */}
                        <div className="overflow-hidden rounded-[1.4rem] border border-border/60 bg-card/90 shadow-2xl shadow-black/10 backdrop-blur-2xl">
                            {/* browser top */}
                            <div className="flex h-11 items-center gap-4 border-b bg-muted/30 px-4">
                                <div className="flex gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                                </div>

                                <div className="hidden flex-1 justify-center sm:flex">
                                    <div className="rounded-md border bg-background/60 px-12 py-1 text-[10px] text-muted-foreground">
                                        {
                                            productShowcase.browserUrl
                                        }
                                    </div>
                                </div>

                                <div className="w-12" />
                            </div>

                            <div className="grid min-h-[430px] md:grid-cols-[180px_1fr]">
                                {/* SIDEBAR */}
                                <div className="hidden border-r bg-muted/20 p-3 md:block">
                                    <div className="mb-7 flex items-center gap-2 px-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                                            {
                                                productShowcase.logoInitial
                                            }
                                        </div>

                                        <span className="text-sm font-semibold">
                                            {
                                                productShowcase.workspaceName
                                            }
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        {productShowcase.navigation.map(
                                            (
                                                item
                                            ) => {
                                                const Icon =
                                                    item.icon;

                                                return (
                                                    <div
                                                        key={
                                                            item.label
                                                        }
                                                        className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-colors ${
                                                            item.active
                                                                ? "bg-primary/10 font-medium text-primary"
                                                                : "text-muted-foreground"
                                                        }`}
                                                    >
                                                        <Icon className="h-3.5 w-3.5" />

                                                        {
                                                            item.label
                                                        }
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>

                                    {/* workspace status */}
                                    <div className="mt-8 rounded-xl border bg-background/50 p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500" />

                                            <span className="text-[10px] font-medium">
                                                Workspace
                                                active
                                            </span>
                                        </div>

                                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                                            <motion.div
                                                initial={{
                                                    width: "0%",
                                                }}
                                                animate={{
                                                    width: "78%",
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 0.8,
                                                }}
                                                className="h-full rounded-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 sm:p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    productShowcase.greeting
                                                }
                                            </p>

                                            <h2 className="mt-1 text-lg font-semibold">
                                                {
                                                    productShowcase.heading
                                                }
                                            </h2>
                                        </div>

                                        <div className="hidden rounded-lg border bg-background px-3 py-1.5 text-[10px] text-muted-foreground sm:block">
                                            {
                                                productShowcase.workspaceLabel
                                            }
                                        </div>
                                    </div>

                                    {/* STATS */}
                                    <div className="mt-6 grid grid-cols-3 gap-2">
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
                                                        y: 8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.5 +
                                                            index *
                                                                0.1,
                                                    }}
                                                    className="rounded-xl border bg-background/60 p-3"
                                                >
                                                    <p className="text-lg font-semibold">
                                                        {
                                                            stat.value
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                                        {
                                                            stat.label
                                                        }
                                                    </p>
                                                </motion.div>
                                            )
                                        )}
                                    </div>

                                    {/* CONVERSATIONS */}
                                    <div className="mt-4 overflow-hidden rounded-xl border bg-background/50">
                                        <div className="border-b px-3 py-2.5 text-xs font-medium">
                                            {
                                                productShowcase.conversationsTitle
                                            }
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
                                                            x: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.65 +
                                                                index *
                                                                    0.12,
                                                        }}
                                                        className="flex items-center gap-3 px-3 py-3"
                                                    >
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-medium">
                                                            {conversation.type ===
                                                            "channel"
                                                                ? "#"
                                                                : "@"}
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-xs font-medium">
                                                                {
                                                                    conversation.title
                                                                }
                                                            </p>

                                                            <p className="truncate text-[10px] text-muted-foreground">
                                                                {
                                                                    conversation.preview
                                                                }
                                                            </p>
                                                        </div>

                                                        <span className="hidden text-[10px] text-muted-foreground sm:block">
                                                            {
                                                                conversation.time
                                                            }
                                                        </span>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING CARD */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                x: -20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 1,
                                duration: 0.5,
                            }}
                            className="absolute -bottom-7 -left-6 hidden rounded-2xl border border-border/60 bg-background/90 p-3 shadow-2xl backdrop-blur-xl sm:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                                    <Sparkles className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold">
                                        {
                                            hero
                                                .floatingCard
                                                .title
                                        }
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                        {
                                            hero
                                                .floatingCard
                                                .description
                                        }
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* FLOATING STATUS */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                x: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 1.15,
                                duration: 0.5,
                            }}
                            className="absolute -right-5 top-16 hidden rounded-xl border border-border/60 bg-background/90 px-3 py-2 shadow-xl backdrop-blur-xl lg:block"
                        >
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                                    <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                                </span>

                                <span className="text-[10px] font-medium">
                                    12 teammates online
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};