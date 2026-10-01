import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Sparkles,
} from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import { type PointerEvent as ReactPointerEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { WorkspaceRailSwitcher } from "@/components/organisms/workspace/WorkspaceRailSwitcher";
import { RELAY_MOTION } from "@/config/design";
import {
    SIDEBAR_DATA,
    type SidebarArea,
    type SidebarSection,
} from "@/config/sidebarNavigation";

const getArea = (pathname: string): SidebarArea => {
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

    const area = getArea(location.pathname);
    const data = SIDEBAR_DATA[area];

    const [search, setSearch] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const [width, setWidth] = useState(292);
    const [collapsedSections, setCollapsedSections] = useState<
        Record<string, boolean>
    >({});

    const toggleSection = (id: string) => {
        setCollapsedSections((current) => ({
            ...current,
            [id]: !current[id],
        }));
    };

    const filteredSections = data.sections
        .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
                item.label.toLowerCase().includes(search.toLowerCase()),
            ),
        }))
        .filter((section) => section.items.length > 0);

    const handleResize = (event: ReactPointerEvent<HTMLDivElement>) => {
        const startX = event.clientX;
        const startWidth = width;

        const handleMove = (moveEvent: PointerEvent) => {
            const nextWidth =
                startWidth + moveEvent.clientX - startX;

            setWidth(Math.min(380, Math.max(240, nextWidth)));
        };

        const handleUp = () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
    };

    return (
        <motion.aside
            animate={{
                width: collapsed ? 0 : width,
            }}
            transition={{
                duration: RELAY_MOTION.duration.normal,
                ease: RELAY_MOTION.ease.standard,
            }}
            className="
                relative
                flex
                h-screen
                shrink-0
                select-none
                overflow-visible
                border-r
                border-white/[0.08]
                bg-[#1b1c21]
                text-zinc-300
                shadow-2xl
            "
        >
            {!collapsed && (
                <div className="flex h-full w-full min-w-0 flex-col">
                    {/* Header - ClickUp Space Switcher Bar */}
                    <div className="
                        group
                        flex
                        h-[64px]
                        shrink-0
                        items-center
                        gap-3
                        border-b
                        border-white/[0.07]
                        px-3.5
                        transition-colors
                        hover:bg-white/[0.02]
                    ">
                        <WorkspaceRailSwitcher />

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <p className="truncate text-[13px] font-bold tracking-tight text-white">
                                    Relay
                                </p>
                                <span className="rounded bg-[#7b68ee]/20 px-1 py-0.2 text-[9px] font-bold tracking-wider text-[#9d8df1]">
                                    v1.0
                                </span>
                            </div>

                            <p className="truncate text-[11px] font-medium text-zinc-400/80">
                                {data.subtitle}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="
                                flex
                                size-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-md
                                text-zinc-400
                                transition-all
                                hover:bg-white/[0.08]
                                hover:text-white
                            "
                        >
                            <ChevronDown size={15} />
                        </button>
                    </div>

                    {/* Search - ClickUp Quick Action Command Bar */}
                    <div className="px-3 pt-3">
                        <div className="
                            flex
                            h-8
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-white/[0.08]
                            bg-[#121316]
                            px-2.5
                            shadow-inner
                            transition-all
                            duration-150
                            focus-within:border-[#7b68ee]/60
                            focus-within:bg-[#15161a]
                            focus-within:ring-1
                            focus-within:ring-[#7b68ee]/30
                        ">
                            <Search
                                size={14}
                                className="text-zinc-400 transition-colors group-focus-within:text-[#7b68ee]"
                            />

                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search space..."
                                className="
                                    min-w-0
                                    flex-1
                                    bg-transparent
                                    text-[12px]
                                    font-medium
                                    text-zinc-200
                                    outline-none
                                    placeholder:text-zinc-400
                                "
                            />

                            <kbd className="
                                hidden
                                items-center
                                rounded
                                border
                                border-white/10
                                bg-white/5
                                px-1.5
                                py-0.5
                                text-[9px]
                                font-semibold
                                tracking-wider
                                text-zinc-400
                                sm:inline-flex
                            ">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* Sections List */}
                    <div className="
                        custom-scrollbar
                        flex-1
                        overflow-y-auto
                        px-2.5
                        py-3
                    ">
                        {filteredSections.map((section) => (
                            <SidebarSectionView
                                key={section.id}
                                section={section}
                                currentPath={location.pathname}
                                collapsed={Boolean(collapsedSections[section.id])}
                                onToggle={() => toggleSection(section.id)}
                                onNavigate={(path) => navigate(path)}
                            />
                        ))}

                        {filteredSections.length === 0 && (
                            <div className="px-3 py-12 text-center">
                                <p className="text-xs font-medium text-zinc-400">
                                    No matching items found
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer - ClickUp 4.0 AI Widget */}
                    <div className="shrink-0 border-t border-white/[0.07] p-2.5">
                        <div className="
                            group
                            flex
                            items-center
                            gap-2.5
                            rounded-xl
                            border
                            border-[#7b68ee]/20
                            bg-gradient-to-r
                            from-[#7b68ee]/10
                            to-[#ff007a]/10
                            p-2
                            transition-all
                            duration-200
                            hover:border-[#7b68ee]/40
                            hover:from-[#7b68ee]/15
                            hover:to-[#ff007a]/15
                        ">
                            <div className="
                                flex
                                size-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-gradient-to-tr
                                from-[#7b68ee]
                                to-[#ff007a]
                                text-white
                                shadow-md
                                shadow-[#7b68ee]/20
                            ">
                                <Sparkles size={13} className="animate-pulse" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-bold text-white tracking-wide">
                                    Relay AI
                                </p>
                                <p className="truncate text-[10px] text-zinc-400">
                                    Workspace Assistant
                                </p>
                            </div>

                            <span className="
                                rounded-md
                                border
                                border-[#7b68ee]/30
                                bg-[#7b68ee]/20
                                px-1.5
                                py-0.5
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-widest
                                text-[#b4a7f5]
                            ">
                                Pro
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Resize Drag Handle */}
            {!collapsed && (
                <div
                    onPointerDown={handleResize}
                    className="
                        absolute
                        -right-[3px]
                        top-0
                        z-40
                        h-full
                        w-[6px]
                        cursor-col-resize
                        group
                    "
                >
                    <div className="
                        mx-auto
                        h-full
                        w-px
                        bg-transparent
                        transition-colors
                        duration-150
                        group-hover:bg-[#7b68ee]
                    " />
                </div>
            )}

            {/* Collapse Toggle Button */}
            <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                className="
                    absolute
                    -right-3
                    top-[72px]
                    z-50
                    flex
                    size-6
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-[#24252d]
                    text-zinc-400
                    shadow-xl
                    transition-all
                    duration-150
                    hover:scale-105
                    hover:border-[#7b68ee]/50
                    hover:bg-[#2b2c36]
                    hover:text-white
                "
            >
                {collapsed ? (
                    <ChevronRight size={13} />
                ) : (
                    <ChevronLeft size={13} />
                )}
            </button>
        </motion.aside>
    );
};

interface SidebarSectionViewProps {
    section: SidebarSection;
    currentPath: string;
    collapsed: boolean;
    onToggle: () => void;
    onNavigate: (path: string) => void;
}

const SidebarSectionView = ({
    section,
    currentPath,
    collapsed,
    onToggle,
    onNavigate,
}: SidebarSectionViewProps) => {
    return (
        <section className="mb-4">
            {/* Section Header */}
            <button
                type="button"
                onClick={onToggle}
                className="
                    group
                    mb-1
                    flex
                    w-full
                    items-center
                    gap-1.5
                    rounded-md
                    px-1.5
                    py-1
                    text-left
                    transition-colors
                    hover:bg-white/[0.03]
                "
            >
                <ChevronDown
                    size={13}
                    className={`
                        text-zinc-400
                        transition-transform
                        duration-200
                        group-hover:text-zinc-200
                        ${collapsed ? "-rotate-90" : ""}
                    `}
                />

                <span className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-zinc-400
                    transition-colors
                    group-hover:text-zinc-200
                ">
                    {section.label}
                </span>

                <span className="
                    ml-auto
                    rounded
                    bg-white/[0.05]
                    px-1.5
                    py-0.2
                    text-[9px]
                    font-semibold
                    text-zinc-400
                    opacity-0
                    transition-opacity
                    group-hover:opacity-100
                ">
                    {section.items.length}
                </span>
            </button>

            {/* Collapsible Section Items */}
            <AnimatePresence initial={false}>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-0.5"
                    >
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.path ? currentPath === item.path : false;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        if (item.path) {
                                            onNavigate(item.path);
                                        }
                                    }}
                                    className={`
                                        group
                                        relative
                                        flex
                                        w-full
                                        items-center
                                        gap-2.5
                                        rounded-lg
                                        px-2.5
                                        py-1.5
                                        text-left
                                        transition-all
                                        duration-150
                                        ${
                                            isActive
                                                ? "bg-[#7b68ee]/15 font-semibold text-white"
                                                : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                                        }
                                    `}
                                >
                                    {/* ClickUp Active Indicator Strip */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#7b68ee]"
                                        />
                                    )}

                                    <span className={`
                                        flex
                                        size-5
                                        shrink-0
                                        items-center
                                        justify-center
                                        transition-colors
                                        ${
                                            isActive
                                                ? "text-[#a092f6]"
                                                : "text-zinc-400 group-hover:text-zinc-200"
                                        }
                                    `}>
                                        {Icon ? (
                                            <Icon
                                                size={15}
                                                strokeWidth={isActive ? 2.2 : 1.8}
                                            />
                                        ) : (
                                            <span className={`
                                                size-1.5
                                                rounded-full
                                                ${isActive ? "bg-[#7b68ee]" : "bg-zinc-600"}
                                            `} />
                                        )}
                                    </span>

                                    <span className="
                                        min-w-0
                                        flex-1
                                        truncate
                                        text-[12px]
                                        tracking-tight
                                    ">
                                        {item.label}
                                    </span>

                                    {item.badge && (
                                        <span className="
                                            rounded
                                            bg-[#7b68ee]/20
                                            px-1.5
                                            py-0.5
                                            text-[8px]
                                            font-bold
                                            tracking-wider
                                            text-[#b4a7f5]
                                        ">
                                            {item.badge}
                                        </span>
                                    )}

                                    {item.unread && (
                                        <span className="
                                            flex
                                            min-w-4
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#ff007a]/20
                                            px-1.5
                                            py-0.2
                                            text-[9px]
                                            font-bold
                                            text-[#ff66b2]
                                        ">
                                            {item.unread}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        {/* Quick Add Button */}
                        <button
                            type="button"
                            className="
                                flex
                                w-full
                                items-center
                                gap-2
                                rounded-lg
                                px-2.5
                                py-1.5
                                text-left
                                text-zinc-500
                                transition-colors
                                hover:bg-white/[0.03]
                                hover:text-zinc-300
                            "
                        >
                            <span className="flex size-5 items-center justify-center text-zinc-500">
                                <Plus size={13} />
                            </span>

                            <span className="text-[11px] font-medium">
                                Create View or List
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};