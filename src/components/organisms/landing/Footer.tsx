import {
    ArrowUp,
    ArrowUpRight,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LANDING_CONFIG } from "./landing.data";
// const socialLinks = [
//     {
//         label: "GitHub",
//         icon: Code2,
//         href: "https://github.com",
//     },
//     {
//         label: "Community",
//         icon: Users,
//         href: "#",
//     },
//     {
//         label: "Website",
//         icon: Globe2,
//         href: "#",
//     },
// ];

export const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const isInView = useInView(footerRef, {
        once: true,
        margin: "-100px",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const { footer, brand } = LANDING_CONFIG;

    const handleLinkClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        link: (typeof footer.columns)[number]["links"][number]
    ) => {
        if (link.route) {
            event.preventDefault();
            navigate(link.route);
            return;
        }

        if (link.anchor) {
            event.preventDefault();

            if (location.pathname !== "/") {
                navigate(`/#${link.anchor}`);
                return;
            }

            document
                .getElementById(link.anchor)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden border-t border-border/50 bg-muted/20"
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
                {/* Main footer content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
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
                        ease: "easeOut",
                    }}
                    className="grid gap-14 lg:grid-cols-[1.5fr_2fr]"
                >
                    {/* Brand */}
                    <div className="max-w-md">
                        <motion.button
                            type="button"
                            onClick={scrollToTop}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group mb-6 flex items-center gap-3"
                        >
                            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-foreground text-background shadow-lg">
                                <span className="text-lg font-bold">
                                    {footer.logoInitial}
                                </span>

                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            </span>

                            <span className="text-2xl font-semibold tracking-tight">
                                {footer.brandName}
                            </span>
                        </motion.button>

                        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                            {footer.description}
                        </p>

                        {/* Social links */}
                        {/* <div className="mt-7 flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        whileHover={{
                                            y: -3,
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-background hover:text-foreground"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </motion.a>
                                );
                            })}
                        </div> */}
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                        {footer.columns.map((column, columnIndex) => (
                            <motion.div
                                key={column.title}
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
                                    duration: 0.5,
                                    delay: 0.1 + columnIndex * 0.08,
                                }}
                            >
                                <h3 className="mb-5 text-sm font-semibold">
                                    {column.title}
                                </h3>

                                <div className="space-y-3">
                                    {column.links.map((link) => {
                                        const href =
                                            link.route ??
                                            (link.anchor
                                                ? `/#${link.anchor}`
                                                : "#");

                                        return (
                                            <a
                                                key={link.label}
                                                href={href}
                                                onClick={(event) =>
                                                    handleLinkClick(
                                                        event,
                                                        link
                                                    )
                                                }
                                                className="group flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <span>{link.label}</span>

                                                {link.external && (
                                                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                                )}
                                            </a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Large brand statement */}
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
                        duration: 0.8,
                        delay: 0.3,
                    }}
                    className="relative mt-24 overflow-hidden rounded-3xl border border-border/50 bg-background/50 px-6 py-10 text-center shadow-sm backdrop-blur-xl sm:px-10"
                >
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px]" />

                    <div className="relative">
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                            {footer.tagline}
                        </p>

                        <h2 className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-[-0.07em] text-foreground/[0.06]">
                            {brand.name}
                        </h2>
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                              }
                            : undefined
                    }
                    transition={{
                        duration: 0.6,
                        delay: 0.45,
                    }}
                    className="mt-8 flex flex-col gap-5 border-t border-border/50 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
                >
                    <p>{footer.copyright}</p>

                    <motion.button
                        type="button"
                        onClick={scrollToTop}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="group flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2 transition-colors hover:border-primary/30 hover:text-foreground"
                    >
                        <span>Back to top</span>

                        <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
};