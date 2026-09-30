import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
} from "lucide-react";
import {
    motion,
} from "motion/react";
import {
    type PointerEvent as ReactPointerEvent,
    useState,
} from "react";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    WorkspaceRailSwitcher,
} from "@/components/organisms/workspace/WorkspaceRailSwitcher";
import {
    RELAY_MOTION,
} from "@/config/design";
import {
    SIDEBAR_DATA,
    type SidebarArea,
    type SidebarSection,
} from "@/config/sidebarNavigation";

const getArea = (
    pathname: string,
): SidebarArea => {
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
    const [collapsedSections, setCollapsedSections] =
        useState<Record<string, boolean>>({});

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
                item.label
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            ),
        }))
        .filter((section) => section.items.length > 0);

    const handleResize = (
        event: ReactPointerEvent<HTMLDivElement>,
    ) => {
        const startX = event.clientX;
        const startWidth = width;

        const handleMove = (moveEvent: PointerEvent) => {
            const nextWidth =
                startWidth +
                moveEvent.clientX -
                startX;

            setWidth(
                Math.min(
                    380,
                    Math.max(240, nextWidth),
                ),
            );
        };

        const handleUp = () => {
            window.removeEventListener(
                "pointermove",
                handleMove,
            );

            window.removeEventListener(
                "pointerup",
                handleUp,
            );
        };

        window.addEventListener(
            "pointermove",
            handleMove,
        );

        window.addEventListener(
            "pointerup",
            handleUp,
        );
    };

    return (
        <motion.aside
            animate={{
                width: collapsed ? 0 : width,
            }}
            transition={{
                duration:
                    RELAY_MOTION.duration.normal,
                ease: RELAY_MOTION.ease.standard,
            }}
            className="
                relative
                flex
                h-screen
                shrink-0
                overflow-visible
                border-r
                border-white/[0.06]
                bg-[#0d0e13]
            "
        >
            {!collapsed && (
                <div className="
                    flex
                    h-full
                    w-full
                    min-w-0
                    flex-col
                ">
                    {/* Header */}
                    <div className="
                        flex
                        h-[72px]
                        shrink-0
                        items-center
                        gap-3
                        border-b
                        border-white/[0.06]
                        px-4
                    ">
                        <WorkspaceRailSwitcher />

                        <div className="
                            min-w-0
                            flex-1
                        ">
                            <p className="
                                truncate
                                text-[13px]
                                font-semibold
                                text-zinc-100
                            ">
                                Relay
                            </p>

                            <p className="
                                mt-0.5
                                truncate
                                text-[11px]
                                text-zinc-600
                            ">
                                {data.subtitle}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="
                                flex
                                size-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                text-zinc-600
                                transition
                                hover:bg-white/[0.05]
                                hover:text-zinc-300
                            "
                        >
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="px-3 pt-3">
                        <div className="
                            flex
                            h-9
                            items-center
                            gap-2
                            rounded-[10px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            px-3
                            transition
                            focus-within:border-cyan-400/20
                            focus-within:bg-white/[0.04]
                        ">
                            <Search
                                size={15}
                                className="text-zinc-600"
                            />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value,
                                    )
                                }
                                placeholder="Search"
                                className="
                                    min-w-0
                                    flex-1
                                    bg-transparent
                                    text-[12px]
                                    text-zinc-300
                                    outline-none
                                    placeholder:text-zinc-700
                                "
                            />

                            <kbd className="
                                hidden
                                rounded
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                px-1.5
                                py-0.5
                                text-[9px]
                                text-zinc-600
                                sm:block
                            ">
                                ⌘ K
                            </kbd>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="
                        flex-1
                        overflow-y-auto
                        px-2
                        pb-4
                        pt-4
                    ">
                        {filteredSections.map(
                            (section) => (
                                <SidebarSectionView
                                    key={section.id}
                                    section={section}
                                    collapsed={
                                        Boolean(
                                            collapsedSections[
                                                section.id
                                            ],
                                        )
                                    }
                                    onToggle={() =>
                                        toggleSection(
                                            section.id,
                                        )
                                    }
                                    onNavigate={(path) =>
                                        navigate(path)
                                    }
                                />
                            ),
                        )}

                        {filteredSections.length === 0 && (
                            <div className="
                                px-3
                                py-10
                                text-center
                            ">
                                <p className="
                                    text-xs
                                    text-zinc-600
                                ">
                                    No results
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="
                        shrink-0
                        border-t
                        border-white/[0.06]
                        p-3
                    ">
                        <div className="
                            flex
                            items-center
                            gap-3
                            rounded-[12px]
                            border
                            border-violet-400/[0.10]
                            bg-gradient-to-r
                            from-cyan-400/[0.035]
                            to-violet-400/[0.05]
                            px-3
                            py-2.5
                        ">
                            <div className="
                                relay-brand-gradient
                                flex
                                size-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                            ">
                                <span className="
                                    text-[11px]
                                    font-bold
                                    text-white
                                ">
                                    ✦
                                </span>
                            </div>

                            <div className="
                                min-w-0
                                flex-1
                            ">
                                <p className="
                                    text-[11px]
                                    font-semibold
                                    text-zinc-200
                                ">
                                    RelayAI
                                </p>

                                <p className="
                                    truncate
                                    text-[10px]
                                    text-zinc-600
                                ">
                                    Your intelligent workspace
                                </p>
                            </div>

                            <span className="
                                rounded-full
                                border
                                border-violet-400/10
                                px-1.5
                                py-0.5
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-violet-300
                            ">
                                AI
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Resize handle */}
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
                    "
                >
                    <div className="
                        mx-auto
                        h-full
                        w-px
                        bg-transparent
                        transition
                        hover:bg-cyan-400/30
                    " />
                </div>
            )}

            {/* Collapse button */}
            <button
                type="button"
                onClick={() =>
                    setCollapsed((value) => !value)
                }
                className="
                    absolute
                    -right-3
                    top-[82px]
                    z-50
                    flex
                    size-6
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-[#15171d]
                    text-zinc-600
                    shadow-lg
                    transition
                    hover:border-white/[0.14]
                    hover:text-zinc-300
                "
            >
                {collapsed ? (
                    <ChevronRight size={12} />
                ) : (
                    <ChevronLeft size={12} />
                )}
            </button>
        </motion.aside>
    );
};

interface SidebarSectionViewProps {
    section: SidebarSection;
    collapsed: boolean;
    onToggle: () => void;
    onNavigate: (path: string) => void;
}

const SidebarSectionView = ({
    section,
    collapsed,
    onToggle,
    onNavigate,
}: SidebarSectionViewProps) => {
    return (
        <section className="mb-5">
            <button
                type="button"
                onClick={onToggle}
                className="
                    group
                    mb-1
                    flex
                    w-full
                    items-center
                    gap-1
                    px-2
                    py-1
                    text-left
                "
            >
                <ChevronDown
                    size={12}
                    className={`
                        text-zinc-700
                        transition-transform
                        ${
                            collapsed
                                ? "-rotate-90"
                                : ""
                        }
                    `}
                />

                <span className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.11em]
                    text-zinc-600
                    transition
                    group-hover:text-zinc-400
                ">
                    {section.label}
                </span>

                <span className="
                    ml-auto
                    hidden
                    text-[9px]
                    text-zinc-700
                    group-hover:block
                ">
                    {section.items.length}
                </span>
            </button>

            {!collapsed && (
                <div className="space-y-0.5">
                    {section.items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    if (item.path) {
                                        onNavigate(item.path);
                                    }
                                }}
                                className="
                                    group
                                    flex
                                    w-full
                                    items-center
                                    gap-2.5
                                    rounded-[9px]
                                    px-2.5
                                    py-2
                                    text-left
                                    transition
                                    hover:bg-white/[0.045]
                                "
                            >
                                <span className="
                                    flex
                                    size-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    text-zinc-600
                                    transition
                                    group-hover:text-zinc-400
                                ">
                                    {Icon ? (
                                        <Icon
                                            size={15}
                                            strokeWidth={1.8}
                                        />
                                    ) : (
                                        <span className="
                                            size-1.5
                                            rounded-full
                                            bg-zinc-700
                                        " />
                                    )}
                                </span>

                                <span className="
                                    min-w-0
                                    flex-1
                                    truncate
                                    text-[12px]
                                    font-medium
                                    text-zinc-500
                                    transition
                                    group-hover:text-zinc-200
                                ">
                                    {item.label}
                                </span>

                                {item.badge && (
                                    <span className="
                                        rounded
                                        bg-violet-400/10
                                        px-1.5
                                        py-0.5
                                        text-[8px]
                                        font-semibold
                                        text-violet-300
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
                                        bg-white/[0.08]
                                        px-1
                                        text-[9px]
                                        font-semibold
                                        text-zinc-400
                                    ">
                                        {item.unread}
                                    </span>
                                )}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        className="
                            flex
                            w-full
                            items-center
                            gap-2.5
                            rounded-[9px]
                            px-2.5
                            py-2
                            text-left
                            text-zinc-700
                            transition
                            hover:bg-white/[0.035]
                            hover:text-zinc-400
                        "
                    >
                        <span className="
                            flex
                            size-5
                            items-center
                            justify-center
                        ">
                            <Plus size={14} />
                        </span>

                        <span className="
                            text-[11px]
                            font-medium
                        ">
                            Add item
                        </span>
                    </button>
                </div>
            )}
        </section>
    );
};