import {
    ChevronDown,
    ChevronsLeft,
    ChevronsRight,
    Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
    type PointerEvent as ReactPointerEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { WorkspaceRailSwitcher } from "@/components/organisms/workspace/WorkspaceRailSwitcher";
import { RELAY_DESIGN } from "@/config/design";
import {
    // RAIL_ITEMS,
    // SETTINGS_ITEM,
    SIDEBAR_DATA,
    type SidebarArea,
    type SidebarItem,
} from "@/config/sidebarNavigation";

const getAreaFromPath = (pathname: string): SidebarArea => {
    if (pathname.startsWith("/app/chat")) {
        return "chat";
    }

    if (pathname.startsWith("/app/agents")) {
        return "agents";
    }

    if (pathname.startsWith("/app/apps")) {
        return "apps";
    }

    return "home";
};

export const AppSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const area = getAreaFromPath(location.pathname);

    const [collapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(
        RELAY_DESIGN.layout.sidebarDefaultWidth,
    );
    const [search, setSearch] = useState("");
    const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

    const resizingRef = useRef(false);

    const sidebarData = SIDEBAR_DATA[area];

    const filteredSections = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return sidebarData;
        }

        return sidebarData
            .map((section) => ({
                ...section,
                items: section.items.filter((item) =>
                    item.label.toLowerCase().includes(query),
                ),
            }))
            .filter((section) => section.items.length > 0);
    }, [search, sidebarData]);

    useEffect(() => {
        setSearch("");
        setCollapsedSections([]);
    }, [area]);

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            if (!resizingRef.current || collapsed) {
                return;
            }

            const nextWidth = Math.min(
                RELAY_DESIGN.layout.sidebarMaxWidth,
                Math.max(
                    RELAY_DESIGN.layout.sidebarMinWidth,
                    event.clientX - RELAY_DESIGN.layout.railWidth,
                ),
            );

            setWidth(nextWidth);
        };

        const handlePointerUp = () => {
            resizingRef.current = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [collapsed]);

    const startResize = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (collapsed) {
            return;
        }

        event.preventDefault();

        resizingRef.current = true;

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };

    const toggleSection = (sectionId: string) => {
        setCollapsedSections((current) =>
            current.includes(sectionId)
                ? current.filter((id) => id !== sectionId)
                : [...current, sectionId],
        );
    };

    const handleItemClick = (item: SidebarItem) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    const isItemActive = (item: SidebarItem) => {
        if (!item.path) {
            return false;
        }

        return location.pathname === item.path;
    };

    return (
        <motion.aside
            initial={false}
            animate={{
                width: collapsed ? 0 : width,
            }}
            transition={{
                duration: collapsed ? 0.18 : 0,
            }}
            className="
                relative z-40
                hidden shrink-0
                border-r border-white/[0.055]
                bg-[#0a0b10]
                lg:block
            "
        >
            <div
                className={`
                    relative flex h-full
                    flex-col overflow-hidden
                    ${collapsed ? "pointer-events-none" : ""}
                `}
                style={{
                    width,
                }}
            >
                {/* -----------------------------------------------------
                    Header
                ------------------------------------------------------ */}

                <div className="shrink-0 px-3 pb-3 pt-3">
                    <WorkspaceRailSwitcher />

                    <div className="mt-3">
                        <div className="
                            flex h-9 items-center gap-2
                            rounded-lg border border-white/[0.055]
                            bg-white/[0.02] px-2.5
                            transition-colors
                            focus-within:border-white/[0.1]
                            focus-within:bg-white/[0.035]
                        ">
                            <Search className="size-3.5 shrink-0 text-zinc-700" />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search..."
                                className="
                                    min-w-0 flex-1
                                    bg-transparent
                                    text-[11px] text-zinc-300
                                    outline-none
                                    placeholder:text-zinc-700
                                "
                            />

                            <kbd className="
                                hidden rounded-md
                                border border-white/[0.06]
                                bg-white/[0.025]
                                px-1.5 py-0.5
                                text-[8px] text-zinc-700
                                xl:block
                            ">
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* -----------------------------------------------------
                    Sidebar navigation
                ------------------------------------------------------ */}

                <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-3">
                    <AnimatePresence mode="popLayout">
                        <div className="space-y-5">
                            {filteredSections.map((section) => {
                                const sectionCollapsed =
                                    collapsedSections.includes(
                                        section.id,
                                    );

                                return (
                                    <motion.section
                                        key={section.id}
                                        layout
                                        initial={{
                                            opacity: 0,
                                            y: 4,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -4,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleSection(section.id)
                                            }
                                            className="
                                                mb-1 flex w-full
                                                items-center gap-1.5
                                                px-2 py-1
                                                text-left
                                            "
                                        >
                                            <motion.div
                                                animate={{
                                                    rotate: sectionCollapsed
                                                        ? 0
                                                        : 90,
                                                }}
                                                transition={{
                                                    duration: 0.15,
                                                }}
                                            >
                                                <ChevronDown className="size-3 text-zinc-700" />
                                            </motion.div>

                                            <span className="
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.14em]
                                                text-zinc-700
                                            ">
                                                {section.label}
                                            </span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {!sectionCollapsed && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.16,
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-0.5">
                                                        {section.items.map(
                                                            (item) => (
                                                                <SidebarNavItem
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    item={item}
                                                                    active={isItemActive(
                                                                        item,
                                                                    )}
                                                                    onClick={() =>
                                                                        handleItemClick(
                                                                            item,
                                                                        )
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.section>
                                );
                            })}
                        </div>
                    </AnimatePresence>
                </div>

                {/* -----------------------------------------------------
                    Footer
                ------------------------------------------------------ */}

                <div className="
                    shrink-0 border-t
                    border-white/[0.055]
                    p-2.5
                ">
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/agents")
                        }
                        className="
                            group flex w-full
                            items-center gap-2.5
                            rounded-xl border
                            border-violet-400/[0.08]
                            bg-gradient-to-r
                            from-cyan-400/[0.035]
                            to-violet-500/[0.045]
                            px-2.5 py-2.5
                            text-left
                            transition-all
                            hover:border-violet-400/[0.15]
                            hover:from-cyan-400/[0.055]
                            hover:to-violet-500/[0.07]
                        "
                    >
                        <div className="
                            flex size-7 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-gradient-to-br
                            from-cyan-400/20
                            to-violet-500/20
                        ">
                            <span className="
                                text-[10px] font-bold
                                text-cyan-300
                            ">
                                ✦
                            </span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="
                                text-[10px]
                                font-semibold
                                text-zinc-300
                            ">
                                RelayAI
                            </p>

                            <p className="
                                mt-0.5 truncate
                                text-[8px]
                                text-zinc-700
                            ">
                                Coming in V2
                            </p>
                        </div>

                        <span className="
                            rounded-full
                            border border-violet-400/[0.1]
                            px-1.5 py-0.5
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-violet-300/60
                        ">
                            V2
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setCollapsed((current) => !current)
                        }
                        className="
                            mt-2 flex w-full
                            items-center justify-center
                            gap-1.5 rounded-lg
                            py-1.5 text-[9px]
                            font-medium text-zinc-700
                            transition-colors
                            hover:bg-white/[0.035]
                            hover:text-zinc-400
                        "
                    >
                        {collapsed ? (
                            <ChevronsRight className="size-3.5" />
                        ) : (
                            <ChevronsLeft className="size-3.5" />
                        )}

                        {collapsed ? "Expand" : "Collapse"}
                    </button>
                </div>

                {/* -----------------------------------------------------
                    Resize handle
                ------------------------------------------------------ */}

                <div
                    role="separator"
                    aria-orientation="vertical"
                    onPointerDown={startResize}
                    className="
                        group absolute
                        right-0 top-0
                        h-full w-1
                        cursor-col-resize
                    "
                >
                    <div className="
                        absolute inset-y-0
                        right-0 w-px
                        bg-transparent
                        transition-colors
                        group-hover:bg-cyan-400/30
                    " />
                </div>
            </div>
        </motion.aside>
    );
};

type SidebarNavItemProps = {
    item: SidebarItem;
    active: boolean;
    onClick: () => void;
};

const SidebarNavItem = ({
    item,
    active,
    onClick,
}: SidebarNavItemProps) => {
    const Icon = item.icon;

    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileTap={{
                scale: 0.985,
            }}
            className={`
                group relative flex w-full
                items-center gap-2.5
                rounded-lg px-2.5 py-2
                text-left transition-colors
                ${
                    active
                        ? "bg-white/[0.065] text-zinc-100"
                        : "text-zinc-600 hover:bg-white/[0.035] hover:text-zinc-300"
                }
            `}
        >
            {active && (
                <motion.div
                    layoutId="relay-sidebar-active"
                    className="
                        absolute left-0
                        h-4.5 w-[2px]
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_8px_rgba(34,211,238,0.45)]
                    "
                />
            )}

            <Icon
                className={`
                    size-3.5 shrink-0
                    transition-colors
                    ${
                        active
                            ? "text-cyan-300"
                            : "text-zinc-700 group-hover:text-zinc-500"
                    }
                `}
            />

            <span className="min-w-0 flex-1 truncate text-[11px] font-medium">
                {item.label}
            </span>

            {item.count !== undefined && (
                <span className="
                    text-[9px]
                    tabular-nums
                    text-zinc-700
                    group-hover:text-zinc-600
                ">
                    {item.count}
                </span>
            )}

            {item.badge && (
                <span className="
                    rounded-full
                    bg-cyan-400/[0.08]
                    px-1.5 py-0.5
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-cyan-300/60
                ">
                    {item.badge}
                </span>
            )}
        </motion.button>
    );
};