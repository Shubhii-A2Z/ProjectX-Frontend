import {
    ArrowUpRight,
    Check,
    Hash,
    MessageCircle,
    // MessageSquare,
    Users,
    Zap,
} from "lucide-react";
import {
    motion,
    useInView,
} from "motion/react";
import { useRef } from "react";

import { Card } from "@/components/ui/card";

import { LANDING_CONFIG } from "./landing.data";

export const Features = () => {
    const sectionRef =
        useRef<HTMLElement>(null);

    const isInView = useInView(
        sectionRef,
        {
            once: true,
            margin: "-100px",
        }
    );

    const { features } =
        LANDING_CONFIG;

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative overflow-hidden border-y bg-muted/[0.15] py-24 sm:py-32"
        >
            {/* BACKGROUND */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[120px]" />

                <div className="absolute bottom-0 right-0 h-[25rem] w-[25rem] rounded-full bg-purple-500/5 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* HEADER */}
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
                        {features.eyebrow}
                    </div>

                    <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        {features.title}
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        {features.description}
                    </p>
                </motion.div>

                {/* FEATURE GRID */}
                <div className="mt-16 grid gap-5 lg:grid-cols-2">
                    {/* FEATURE 1 */}
                    <FeatureCard
                        item={features.items[0]}
                        isInView={isInView}
                        className="lg:row-span-2"
                    >
                        <CommunicationVisual />
                    </FeatureCard>

                    {/* FEATURE 2 */}
                    <FeatureCard
                        item={features.items[1]}
                        isInView={isInView}
                    >
                        <ChannelsVisual />
                    </FeatureCard>

                    {/* FEATURE 3 */}
                    <FeatureCard
                        item={features.items[2]}
                        isInView={isInView}
                    >
                        <WorkspaceVisual />
                    </FeatureCard>
                </div>

                {/* FEATURE 4 */}
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
                        delay: 0.4,
                    }}
                    className="mt-5"
                >
                    <Card className="group relative overflow-hidden border-border/60 bg-background/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl">
                        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                            <div>
                                <FeatureHeading
                                    item={features.items[3]}
                                />

                                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                                    {
                                        features
                                            .items[3]
                                            .description
                                    }
                                </p>
                            </div>

                            <FocusVisual />
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

/* -------------------------------------------------- */
/* FEATURE CARD */
/* -------------------------------------------------- */

interface FeatureCardProps {
    item: (typeof LANDING_CONFIG.features.items)[number];
    isInView: boolean;
    children: React.ReactNode;
    className?: string;
}

const FeatureCard = ({
    item,
    isInView,
    children,
    className = "",
}: FeatureCardProps) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
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
                delay:
                    Number(item.number) *
                    0.08,
            }}
            className={className}
        >
            <Card className="group relative h-full overflow-hidden border-border/60 bg-background/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl">
                <div className="flex h-full flex-col">
                    <FeatureHeading item={item} />

                    <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                        {item.description}
                    </p>

                    <div className="mt-8 flex-1">
                        {children}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

/* -------------------------------------------------- */
/* HEADING */
/* -------------------------------------------------- */

const FeatureHeading = ({
    item,
}: {
    item: (typeof LANDING_CONFIG.features.items)[number];
}) => {
    const Icon = item.icon;

    return (
        <div className="flex items-start justify-between gap-5">
            <div>
                <div className="mb-5 flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-widest text-primary">
                        {item.number}
                    </span>

                    <div className="h-px w-8 bg-border" />
                </div>

                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.title}
                </h3>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted/40 text-primary transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/10">
                <Icon className="h-5 w-5" />
            </div>
        </div>
    );
};

/* -------------------------------------------------- */
/* COMMUNICATION VISUAL */
/* -------------------------------------------------- */

const CommunicationVisual = () => {
    const messages = [
        {
            initial: "S",
            name: "Sarah",
            text: "The latest update is ready.",
        },
        {
            initial: "A",
            name: "Alex",
            text: "Looks good. I'll review it.",
        },
        {
            initial: "J",
            name: "James",
            text: "Perfect, let's ship it.",
        },
    ];

    return (
        <div className="relative min-h-[260px] overflow-hidden rounded-2xl border bg-muted/20 p-4">
            {/* subtle glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            {/* channel header */}
            <div className="relative flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Hash className="h-3.5 w-3.5" />
                    </div>

                    <span className="text-xs font-semibold">
                        project-alpha
                    </span>
                </div>

                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                </span>
            </div>

            {/* messages */}
            <div className="relative mt-4 space-y-4">
                {messages.map(
                    (
                        message,
                        index
                    ) => (
                        <motion.div
                            key={message.name}
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay:
                                    0.2 +
                                    index *
                                        0.15,
                            }}
                            className="flex gap-3"
                        >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                                {
                                    message.initial
                                }
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-semibold">
                                        {
                                            message.name
                                        }
                                    </span>

                                    <span className="text-[9px] text-muted-foreground">
                                        10:42 AM
                                    </span>
                                </div>

                                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                                    {
                                        message.text
                                    }
                                </p>
                            </div>
                        </motion.div>
                    )
                )}
            </div>

            {/* input */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-lg border bg-background/80 px-3 py-2">
                <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />

                <span className="text-[10px] text-muted-foreground">
                    Message #project-alpha...
                </span>
            </div>
        </div>
    );
};

/* -------------------------------------------------- */
/* CHANNELS VISUAL */
/* -------------------------------------------------- */

const ChannelsVisual = () => {
    const channels = [
        "# engineering",
        "# design",
        "# project-alpha",
        "# product",
    ];

    return (
        <div className="relative overflow-hidden rounded-2xl border bg-muted/20 p-4">
            <div className="space-y-2">
                {channels.map(
                    (channel, index) => (
                        <motion.div
                            key={channel}
                            initial={{
                                opacity: 0,
                                x: -8,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay:
                                    index *
                                    0.08,
                            }}
                            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs transition-colors ${
                                index === 2
                                    ? "bg-primary/10 font-medium text-primary"
                                    : "bg-background/50 text-muted-foreground"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Hash className="h-3.5 w-3.5" />
                                {channel.replace(
                                    "# ",
                                    ""
                                )}
                            </div>

                            {index === 2 && (
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                        </motion.div>
                    )
                )}
            </div>
        </div>
    );
};

/* -------------------------------------------------- */
/* WORKSPACE VISUAL */
/* -------------------------------------------------- */

const WorkspaceVisual = () => {
    return (
        <div className="grid grid-cols-3 gap-2">
            {[
                {
                    value: "42",
                    label: "Members",
                },
                {
                    value: "128",
                    label: "Messages",
                },
                {
                    value: "24",
                    label: "Channels",
                },
            ].map(
                (stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            delay:
                                index * 0.1,
                        }}
                        className="rounded-xl border bg-muted/20 p-4"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            {index ===
                            0 ? (
                                <Users className="h-4 w-4" />
                            ) : index ===
                              1 ? (
                                <MessageCircle className="h-4 w-4" />
                            ) : (
                                <Hash className="h-4 w-4" />
                            )}
                        </div>

                        <p className="mt-5 text-xl font-semibold">
                            {stat.value}
                        </p>

                        <p className="mt-1 text-[10px] text-muted-foreground">
                            {stat.label}
                        </p>
                    </motion.div>
                )
            )}
        </div>
    );
};

/* -------------------------------------------------- */
/* FOCUS VISUAL */
/* -------------------------------------------------- */

const FocusVisual = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl border bg-muted/20 p-5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium">
                        Your workspace
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                        Everything important, without the noise.
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                </div>
            </div>

            <div className="relative mt-6 grid gap-2 sm:grid-cols-3">
                {[
                    "Stay aligned",
                    "Find context",
                    "Keep moving",
                ].map(
                    (item, index) => (
                        <motion.div
                            key={item}
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay:
                                    index *
                                    0.1,
                            }}
                            className="flex items-center gap-2 rounded-lg border bg-background/60 px-3 py-3"
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Check className="h-3 w-3" />
                            </div>

                            <span className="text-[10px] font-medium">
                                {item}
                            </span>
                        </motion.div>
                    )
                )}
            </div>

            <div className="relative mt-4 flex items-center justify-between rounded-lg border bg-background/60 px-3 py-2.5">
                <span className="text-[10px] text-muted-foreground">
                    Focus mode
                </span>

                <div className="flex items-center gap-1 text-[10px] font-medium text-primary">
                    Active
                    <ArrowUpRight className="h-3 w-3" />
                </div>
            </div>
        </div>
    );
};