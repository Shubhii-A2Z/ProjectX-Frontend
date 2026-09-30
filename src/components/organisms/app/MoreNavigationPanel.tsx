import { Settings2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MORE_NAVIGATION } from "@/config/moreNavigation";
import { cn } from "@/lib/utils";

interface MoreNavigationPanelProps {
    open: boolean;
    onClose: () => void;
}

export const MoreNavigationPanel = ({
    open,
    onClose,
}: MoreNavigationPanelProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointerDown = (event: MouseEvent): void => {
            const target = event.target as Node;

            if (
                panelRef.current &&
                !panelRef.current.contains(target)
            ) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "mousedown",
            handlePointerDown
        );

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handlePointerDown
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [open, onClose]);

    const handleNavigation = (path: string): void => {
        navigate(path);
        onClose();
    };

    const handleCustomize = (): void => {
        navigate("/app/settings");
        onClose();
    };

    if (!open) {
        return null;
    }

    return (
        <div
            ref={panelRef}
            className={cn(
                "absolute left-[calc(100%+10px)] top-1/2 z-50",
                "w-[330px] -translate-y-1/2",
                "origin-left",
                "animate-in fade-in-0 zoom-in-95 slide-in-from-left-2",
                "duration-200"
            )}
        >
            <div
                className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "border border-white/[0.09]",
                    "bg-[#111218]/95",
                    "shadow-[0_24px_80px_rgba(0,0,0,0.65)]",
                    "backdrop-blur-2xl"
                )}
            >
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -left-20 -top-20 size-40 rounded-full bg-cyan-400/[0.07] blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 -right-16 size-44 rounded-full bg-violet-500/[0.08] blur-3xl" />

                {/* Header */}
                <div className="relative flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
                    <div>
                        <p className="text-sm font-semibold tracking-tight text-white">
                            More from Relay
                        </p>

                        <p className="mt-0.5 text-[10px] text-white/35">
                            Everything you need, in one place
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={onClose}
                        className={cn(
                            "flex size-7 items-center justify-center",
                            "rounded-lg",
                            "border border-transparent",
                            "text-white/35",
                            "transition-all duration-200",
                            "hover:border-white/[0.08]",
                            "hover:bg-white/[0.06]",
                            "hover:text-white"
                        )}
                    >
                        <X className="size-3.5" />
                    </button>
                </div>

                {/* Navigation grid */}
                <div className="relative grid grid-cols-3 gap-1.5 p-3">
                    {MORE_NAVIGATION.map((item) => {
                        const isActive =
                            location.pathname === item.path ||
                            location.pathname.startsWith(
                                `${item.path}/`
                            );

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    handleNavigation(item.path)
                                }
                                className={cn(
                                    "group relative flex min-h-[105px] flex-col",
                                    "items-center justify-center",
                                    "rounded-xl",
                                    "border",
                                    "px-2 py-3",
                                    "transition-all duration-200",
                                    "outline-none",
                                    isActive
                                        ? [
                                              "border-cyan-300/[0.18]",
                                              "bg-cyan-300/[0.06]",
                                              "shadow-[0_0_22px_rgba(103,232,249,0.06)]",
                                          ]
                                        : [
                                              "border-transparent",
                                              "hover:border-white/[0.07]",
                                              "hover:bg-white/[0.045]",
                                          ]
                                )}
                            >
                                {/* Hover glow */}
                                <span
                                    className={cn(
                                        "pointer-events-none absolute inset-0 rounded-xl",
                                        "bg-gradient-to-br from-cyan-400/[0.06] via-transparent to-violet-400/[0.07]",
                                        "opacity-0 transition-opacity duration-200",
                                        "group-hover:opacity-100"
                                    )}
                                />

                                {/* Icon */}
                                <div
                                    className={cn(
                                        "relative flex size-12 items-center justify-center",
                                        "rounded-xl",
                                        "border",
                                        "transition-all duration-200",
                                        isActive
                                            ? [
                                                  "border-cyan-300/[0.16]",
                                                  "bg-white/[0.06]",
                                                  "shadow-[0_0_18px_rgba(103,232,249,0.08)]",
                                              ]
                                            : [
                                                  "border-white/[0.06]",
                                                  "bg-white/[0.025]",
                                                  "group-hover:border-white/[0.11]",
                                                  "group-hover:bg-white/[0.06]",
                                              ]
                                    )}
                                >
                                    <img
                                        src={item.icon}
                                        alt=""
                                        draggable={false}
                                        className={cn(
                                            "size-8 object-contain",
                                            "transition-transform duration-200",
                                            "group-hover:scale-110",
                                            isActive &&
                                                "scale-105"
                                        )}
                                    />
                                </div>

                                {/* Label */}
                                <span
                                    className={cn(
                                        "relative mt-2 text-[10px] font-medium",
                                        "transition-colors duration-200",
                                        isActive
                                            ? "text-white"
                                            : "text-white/65 group-hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <span className="absolute bottom-1.5 size-1 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.07] p-3">
                    <button
                        type="button"
                        onClick={handleCustomize}
                        className={cn(
                            "group flex w-full items-center gap-2.5",
                            "rounded-lg",
                            "border border-white/[0.07]",
                            "bg-white/[0.025]",
                            "px-3 py-2.5",
                            "text-left",
                            "transition-all duration-200",
                            "hover:border-cyan-300/[0.15]",
                            "hover:bg-white/[0.05]"
                        )}
                    >
                        <div className="flex size-7 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.035]">
                            <Settings2 className="size-3.5 text-white/45 transition-colors group-hover:text-cyan-200" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-medium text-white/70 transition-colors group-hover:text-white">
                                Customize navigation
                            </p>

                            <p className="mt-0.5 text-[9px] text-white/30">
                                Manage your sidebar
                            </p>
                        </div>

                        <span className="text-[9px] text-white/20 transition-colors group-hover:text-cyan-300/50">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};