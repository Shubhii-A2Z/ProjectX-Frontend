import {
    ArrowRight,
    Check,
    Sparkles,
    Users,
    Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { LANDING_CONFIG } from "./landing.data";

export const CTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.3,
    });

    const { cta } = LANDING_CONFIG;

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden border-t border-border/40 py-28 sm:py-36"
        >
            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="pointer-events-none absolute inset-0">
                {/* Main radial glow */}
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.10] blur-[140px]" />

                {/* Side glows */}
                <div className="absolute left-[-10%] top-[30%] h-[280px] w-[280px] rounded-full bg-violet-500/[0.08] blur-[100px]" />

                <div className="absolute right-[-10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-primary/[0.08] blur-[100px]" />

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

            {/* =====================================================
                ORBITING DECORATION
            ===================================================== */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 lg:block">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border border-border/30"
                />

                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute left-[8%] top-[8%] h-[84%] w-[84%] rounded-full border border-primary/10"
                />

                {/* Orbit dots */}
                <OrbitDot
                    className="left-[14%] top-[15%]"
                    delay={0}
                />

                <OrbitDot
                    className="right-[13%] top-[32%]"
                    delay={0.8}
                />

                <OrbitDot
                    className="bottom-[17%] left-[28%]"
                    delay={1.4}
                />

                <OrbitDot
                    className="bottom-[27%] right-[18%]"
                    delay={2}
                />
            </div>

            <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
                {/* =================================================
                    TOP BADGE
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
                        duration: 0.6,
                    }}
                    className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3.5 py-2 shadow-sm backdrop-blur-xl"
                >
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                        <Sparkles className="h-3 w-3 text-primary" />
                    </span>

                    <span className="text-xs font-semibold text-muted-foreground">
                        Built for teams that build
                    </span>
                </motion.div>

                {/* =================================================
                    HEADING
                ================================================= */}

                <motion.h2
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
                        delay: 0.08,
                    }}
                    className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-7xl"
                >
                    {cta.title}
                </motion.h2>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <motion.p
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
                        delay: 0.18,
                    }}
                    className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
                >
                    {cta.description}
                </motion.p>

                {/* =================================================
                    ACTION
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
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
                        duration: 0.6,
                        delay: 0.28,
                    }}
                    className="mt-9 flex justify-center"
                >
                    <motion.button
                        type="button"
                        onClick={() =>
                            navigate(cta.buttonRoute)
                        }
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20"
                    >
                        {/* Button shine */}
                        <motion.span
                            initial={{
                                x: "-120%",
                            }}
                            animate={
                                isInView
                                    ? {
                                          x: "120%",
                                      }
                                    : undefined
                            }
                            transition={{
                                duration: 1.4,
                                delay: 0.8,
                                ease: "easeInOut",
                            }}
                            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/20"
                        />

                        <span className="relative">
                            {cta.buttonLabel}
                        </span>

                        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                </motion.div>

                {/* =================================================
                    TRUST POINTS
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
                        duration: 0.6,
                        delay: 0.42,
                    }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
                >
                    <TrustPoint icon={Check}>
                        Free to get started
                    </TrustPoint>

                    <TrustPoint icon={Users}>
                        Built for teams
                    </TrustPoint>

                    <TrustPoint icon={Zap}>
                        Simple from day one
                    </TrustPoint>
                </motion.div>

                {/* =================================================
                    MINI PRODUCT SIGNAL
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
                        delay: 0.55,
                    }}
                    className="relative mx-auto mt-20 max-w-3xl"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-1 shadow-2xl shadow-black/[0.06] backdrop-blur-xl">
                        {/* Inner surface */}
                        <div className="relative overflow-hidden rounded-[1.35rem] border border-border/40 bg-muted/20 px-5 py-8 sm:px-8">
                            {/* Glow */}
                            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                            <div className="relative flex flex-col items-center justify-center gap-5 sm:flex-row">
                                {/* Workspace node */}
                                <ProductNode
                                    icon="R"
                                    label="Workspace"
                                />

                                <Connection />

                                {/* Team node */}
                                <ProductNode
                                    icon="12"
                                    label="Teammates"
                                />

                                <Connection />

                                {/* Conversation node */}
                                <ProductNode
                                    icon="•••"
                                    label="Conversations"
                                />

                                <Connection />

                                {/* Relay node */}
                                <ProductNode
                                    icon="✦"
                                    label="Relay"
                                    active
                                />
                            </div>
                        </div>
                    </div>

                    {/* Floating label */}
                    <motion.div
                        animate={{
                            y: [0, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -right-3 -top-4 hidden rounded-full border border-border/60 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur-xl sm:block"
                    >
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Everything connected
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

/* =========================================================
   TRUST POINT
========================================================= */

interface TrustPointProps {
    icon: React.ElementType;
    children: React.ReactNode;
}

const TrustPoint = ({
    icon: Icon,
    children,
}: TrustPointProps) => {
    return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-2.5 w-2.5 text-primary" />
            </span>

            {children}
        </div>
    );
};

/* =========================================================
   PRODUCT NODE
========================================================= */

interface ProductNodeProps {
    icon: string;
    label: string;
    active?: boolean;
}

const ProductNode = ({
    icon,
    label,
    active = false,
}: ProductNodeProps) => {
    return (
        <motion.div
            whileHover={{
                y: -3,
            }}
            className="flex items-center gap-2"
        >
            <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl border text-[10px] font-bold shadow-sm ${
                    active
                        ? "border-primary/30 bg-primary/10 text-primary shadow-primary/10"
                        : "border-border/60 bg-background text-muted-foreground"
                }`}
            >
                {icon}
            </div>

            <span className="text-[10px] font-medium text-muted-foreground">
                {label}
            </span>
        </motion.div>
    );
};

/* =========================================================
   CONNECTION
========================================================= */

const Connection = () => {
    return (
        <div className="hidden h-px w-8 bg-gradient-to-r from-border via-primary/30 to-border sm:block" />
    );
};

/* =========================================================
   ORBIT DOT
========================================================= */

interface OrbitDotProps {
    className: string;
    delay: number;
}

const OrbitDot = ({
    className,
    delay,
}: OrbitDotProps) => {
    return (
        <motion.div
            className={`absolute ${className}`}
            animate={{
                opacity: [0.25, 0.8, 0.25],
                scale: [0.8, 1, 0.8],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            <div className="h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/30" />
        </motion.div>
    );
};