import {
    Activity,
    FileText,
    Folder,
    Layers3,
    Pin,
    PinOff,
    Search,
    X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MORE_NAVIGATION } from "@/config/sidebarNavigation";

interface MoreNavigationMenuProps {
    open: boolean;
    onClose: () => void;
}

const ICONS = {
    layers: Layers3,
    file: FileText,
    activity: Activity,
    folder: Folder,
};

export const MoreNavigationMenu = ({
    open,
    onClose,
}: MoreNavigationMenuProps) => {
    const navigate = useNavigate();
    const panelRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState("");

    const [pinned, setPinned] = useState<string[]>([
        "docs",
        "activity",
    ]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointerDown = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    const filteredItems = MORE_NAVIGATION.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
    );

    const pinnedItems = filteredItems.filter((item) =>
        pinned.includes(item.id),
    );

    const otherItems = filteredItems.filter(
        (item) => !pinned.includes(item.id),
    );

    const togglePin = (id: string) => {
        setPinned((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const navigateTo = (path: string) => {
        navigate(path);
        onClose();
    };

    const renderItem = (item: (typeof MORE_NAVIGATION)[number]) => {
        const Icon = ICONS[item.icon as keyof typeof ICONS];
        const isPinned = pinned.includes(item.id);

        return (
            <div
                key={item.id}
                className="
                    group flex items-center gap-3 rounded-xl
                    px-3 py-2.5
                    transition-colors
                    hover:bg-white/[0.055]
                "
            >
                <button
                    type="button"
                    onClick={() => navigateTo(item.path)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                    <div
                        className="
                            flex size-9 shrink-0 items-center justify-center
                            rounded-lg border border-white/[0.06]
                            bg-white/[0.035]
                            text-white/55
                            transition-colors
                            group-hover:text-cyan-300
                        "
                    >
                        <Icon className="size-4" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white/85">
                            {item.label}
                        </p>

                        <p className="truncate text-[11px] text-white/30">
                            {item.description}
                        </p>
                    </div>
                </button>

                <button
                    type="button"
                    aria-label={
                        isPinned
                            ? `Unpin ${item.label}`
                            : `Pin ${item.label}`
                    }
                    onClick={() => togglePin(item.id)}
                    className="
                        flex size-8 items-center justify-center
                        rounded-lg
                        text-white/20
                        opacity-0
                        transition-all
                        group-hover:opacity-100
                        hover:bg-white/[0.06]
                        hover:text-white/70
                    "
                >
                    {isPinned ? (
                        <PinOff className="size-3.5" />
                    ) : (
                        <Pin className="size-3.5" />
                    )}
                </button>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={panelRef}
                    initial={{
                        opacity: 0,
                        x: -12,
                        scale: 0.98,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        x: -12,
                        scale: 0.98,
                    }}
                    transition={{
                        duration: 0.18,
                    }}
                    className="
                        absolute left-[88px] top-20 z-50
                        w-[360px]
                        overflow-hidden rounded-2xl
                        border border-white/[0.09]
                        bg-[#111217]/95
                        shadow-[0_28px_90px_rgba(0,0,0,0.55)]
                        backdrop-blur-2xl
                    "
                >
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5">
                        <div>
                            <h3 className="text-sm font-semibold text-white">
                                More
                            </h3>

                            <p className="mt-0.5 text-[11px] text-white/30">
                                Customize your navigation
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex size-8 items-center justify-center
                                rounded-lg
                                text-white/35
                                transition-colors
                                hover:bg-white/[0.06]
                                hover:text-white
                            "
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    <div className="p-3">
                        <div
                            className="
                                flex items-center gap-2 rounded-xl
                                border border-white/[0.06]
                                bg-white/[0.035]
                                px-3
                            "
                        >
                            <Search className="size-4 text-white/25" />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search navigation..."
                                className="
                                    h-10 min-w-0 flex-1 bg-transparent
                                    text-sm text-white
                                    outline-none
                                    placeholder:text-white/25
                                "
                            />
                        </div>
                    </div>

                    <div className="max-h-[480px] overflow-y-auto px-2 pb-3">
                        {pinnedItems.length > 0 && (
                            <div className="mb-3">
                                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
                                    Pinned
                                </p>

                                {pinnedItems.map(renderItem)}
                            </div>
                        )}

                        {otherItems.length > 0 && (
                            <div>
                                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
                                    Navigation
                                </p>

                                {otherItems.map(renderItem)}
                            </div>
                        )}

                        {filteredItems.length === 0 && (
                            <div className="px-4 py-10 text-center">
                                <p className="text-sm text-white/45">
                                    No navigation items found
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-white/[0.06] px-4 py-3">
                        <p className="text-[11px] text-white/25">
                            Pin your most-used areas for quick access.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};