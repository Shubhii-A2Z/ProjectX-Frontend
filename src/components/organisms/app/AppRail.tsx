import {
    Bell,
    ChevronRight,
    MoreHorizontal,
    Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";

import relayLogo from "@/assets/sidebar/relay-logo.png";
import userIcon from "@/assets/sidebar/user-icon.png";
import {
    RAIL_ITEMS,
    SETTINGS_ITEM,
} from "@/config/sidebarNavigation";

export const AppRail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="relative z-50 flex h-screen w-[76px] shrink-0 flex-col border-r border-white/[0.055] bg-[#08090d]">
            {/* ---------------------------------------------------------
                Brand
            ---------------------------------------------------------- */}

            <div className="flex h-[68px] items-center justify-center">
                <motion.button
                    type="button"
                    onClick={() => navigate("/app/home")}
                    whileHover={{
                        scale: 1.04,
                    }}
                    whileTap={{
                        scale: 0.94,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 28,
                    }}
                    className="
                        group relative flex size-10
                        items-center justify-center
                        rounded-xl
                        border border-white/[0.07]
                        bg-white/[0.035]
                        shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                    "
                    aria-label="Go to Relay home"
                >
                    <img
                        src={relayLogo}
                        alt="Relay"
                        className="
                            size-6 object-contain
                            opacity-90
                            transition-opacity
                            group-hover:opacity-100
                        "
                    />

                    <div className="
                        pointer-events-none absolute
                        inset-0 rounded-xl
                        bg-cyan-400/[0.04]
                        opacity-0 blur-md
                        transition-opacity
                        group-hover:opacity-100
                    " />
                </motion.button>
            </div>

            {/* ---------------------------------------------------------
                Main navigation
            ---------------------------------------------------------- */}

            <nav className="flex flex-1 flex-col items-center px-2 pt-3">
                <div className="flex w-full flex-col items-center gap-1">
                    {RAIL_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <RailButton
                                key={item.id}
                                label={item.label}
                                active={active}
                                icon={<Icon size={17} />}
                                onClick={() => navigate(item.path)}
                            />
                        );
                    })}
                </div>

                <div className="my-4 h-px w-8 bg-white/[0.055]" />

                {/* Inbox */}

                <RailButton
                    label="Notifications"
                    active={false}
                    icon={<Bell size={17} />}
                    onClick={() => {
                        // Notifications UI will be added later.
                    }}
                    indicator
                />

                <RailButton
                    label="More"
                    active={false}
                    icon={<MoreHorizontal size={18} />}
                    onClick={() => {
                        // More menu will be added later.
                    }}
                />
            </nav>

            {/* ---------------------------------------------------------
                Bottom navigation
            ---------------------------------------------------------- */}

            <div className="flex flex-col items-center gap-1 border-t border-white/[0.055] px-2 py-3">
                <RailButton
                    label={SETTINGS_ITEM.label}
                    active={isActive(SETTINGS_ITEM.path)}
                    icon={<Settings size={17} />}
                    onClick={() => navigate(SETTINGS_ITEM.path)}
                />

                <motion.button
                    type="button"
                    onClick={() => {
                        // Profile menu will be added later.
                    }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    className="
                        relative mt-1 flex size-9
                        items-center justify-center
                        rounded-xl
                        border border-white/[0.07]
                        bg-white/[0.035]
                        transition-colors
                        hover:border-white/[0.12]
                        hover:bg-white/[0.06]
                    "
                    aria-label="Open profile"
                >
                    <img
                        src={userIcon}
                        alt=""
                        className="size-5 object-contain opacity-80"
                    />

                    <span className="
                        absolute bottom-0 right-0
                        size-2 rounded-full
                        border-2 border-[#08090d]
                        bg-emerald-400
                    " />
                </motion.button>
            </div>
        </aside>
    );
};

type RailButtonProps = {
    label: string;
    active: boolean;
    icon: React.ReactNode;
    onClick: () => void;
    indicator?: boolean;
};

const RailButton = ({
    label,
    active,
    icon,
    onClick,
    indicator = false,
}: RailButtonProps) => {
    return (
        <div className="group relative w-full">
            <motion.button
                type="button"
                onClick={onClick}
                whileHover={{
                    scale: 1.035,
                }}
                whileTap={{
                    scale: 0.94,
                }}
                transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                }}
                className={`
                    relative flex h-10 w-full
                    items-center justify-center
                    rounded-xl
                    transition-colors
                    ${
                        active
                            ? "text-zinc-100"
                            : "text-zinc-600 hover:bg-white/[0.045] hover:text-zinc-300"
                    }
                `}
                aria-label={label}
            >
                {active && (
                    <motion.div
                        layoutId="relay-rail-active"
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                        }}
                        className="
                            absolute inset-0
                            rounded-xl
                            border border-white/[0.08]
                            bg-white/[0.07]
                            shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                        "
                    />
                )}

                {active && (
                    <motion.div
                        layoutId="relay-rail-indicator"
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                        }}
                        className="
                            absolute -left-[9px]
                            h-5 w-[2px]
                            rounded-full
                            bg-cyan-400
                            shadow-[0_0_10px_rgba(34,211,238,0.5)]
                        "
                    />
                )}

                <span className="relative z-10">
                    {icon}
                </span>

                {indicator && (
                    <span className="
                        absolute right-[15px] top-[8px]
                        z-20 size-1.5
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_8px_rgba(34,211,238,0.7)]
                    " />
                )}
            </motion.button>

            {/* Tooltip */}

            <div className="
                pointer-events-none absolute
                left-[calc(100%+12px)]
                top-1/2 z-[100]
                hidden -translate-y-1/2
                items-center gap-1.5
                whitespace-nowrap
                rounded-lg
                border border-white/[0.08]
                bg-[#15171d]
                px-2.5 py-1.5
                text-[10px] font-medium
                text-zinc-300
                opacity-0 shadow-xl
                transition-opacity
                group-hover:flex
                group-hover:opacity-100
            ">
                {label}

                <ChevronRight className="h-3 w-3 text-zinc-700" />
            </div>
        </div>
    );
};