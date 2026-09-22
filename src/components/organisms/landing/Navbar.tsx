import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { LANDING_CONFIG } from "./landing.data";

export const Navbar = () => {
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);

    const { brand, navbar } = LANDING_CONFIG;

    const handleLinkClick = (
        route?: string,
        anchor?: string
    ) => {
        setMobileOpen(false);

        if (route) {
            navigate(route);
            return;
        }

        if (anchor) {
            document
                .getElementById(anchor)
                ?.scrollIntoView({
                    behavior: "smooth",
                });
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* BRAND */}
                <motion.button
                    type="button"
                    onClick={() =>
                        navigate(brand.homeRoute)
                    }
                    whileHover={{
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    className="group flex items-center gap-2"
                >
                    <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

                        <span className="relative">
                            {brand.logoInitial}
                        </span>
                    </div>

                    <span className="text-lg font-semibold tracking-tight">
                        {brand.name}
                    </span>
                </motion.button>

                {/* DESKTOP NAV */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navbar.links.map((link) => (
                        <button
                            key={link.label}
                            type="button"
                            onClick={() =>
                                handleLinkClick(
                                    link.route,
                                    link.anchor
                                )
                            }
                            className="group relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}

                            <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                        </button>
                    ))}
                </nav>

                {/* DESKTOP ACTIONS */}
                <div className="hidden items-center gap-2 md:flex">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            navigate(navbar.login.route)
                        }
                    >
                        {navbar.login.label}
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(navbar.signup.route)
                        }
                        className="shadow-lg shadow-primary/20"
                    >
                        {navbar.signup.label}
                    </Button>
                </div>

                {/* MOBILE BUTTON */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() =>
                        setMobileOpen(
                            (previous) => !previous
                        )
                    }
                    aria-label={
                        mobileOpen
                            ? "Close navigation"
                            : "Open navigation"
                    }
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl md:hidden"
                    >
                        <div className="px-6 py-5">
                            <nav className="flex flex-col gap-1">
                                {navbar.links.map(
                                    (link, index) => (
                                        <motion.button
                                            key={link.label}
                                            initial={{
                                                opacity: 0,
                                                x: -8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.04,
                                            }}
                                            type="button"
                                            onClick={() =>
                                                handleLinkClick(
                                                    link.route,
                                                    link.anchor
                                                )
                                            }
                                            className="rounded-xl px-3 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                                        >
                                            {
                                                link.label
                                            }
                                        </motion.button>
                                    )
                                )}
                            </nav>

                            <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate(
                                            navbar.login
                                                .route
                                        )
                                    }
                                >
                                    {
                                        navbar.login
                                            .label
                                    }
                                </Button>

                                <Button
                                    onClick={() =>
                                        navigate(
                                            navbar.signup
                                                .route
                                        )
                                    }
                                >
                                    {
                                        navbar.signup
                                            .label
                                    }
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};