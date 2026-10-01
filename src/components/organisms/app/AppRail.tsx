import {
    Inbox,
    MoreHorizontal,
    Settings,
} from "lucide-react";
import {
    motion,
} from "motion/react";
import {
    NavLink,
    useLocation,
} from "react-router-dom";

import {
    RELAY_MOTION,
} from "@/config/design";
import {
    RAIL_ITEMS,
    SETTINGS_ITEM,
} from "@/config/sidebarNavigation";

const isActiveRoute = (
    pathname: string,
    path: string,
) => {
    return pathname === path ||
        pathname.startsWith(`${path}/`);
};

export const AppRail = () => {
    const location = useLocation();

    return (
        <aside className="
            relative
            z-50
            flex
            h-screen
            w-[76px]
            shrink-0
            flex-col
            items-center
            border-r
            border-white/[0.06]
            bg-[#0a0b10]
        ">
            {/* Logo */}
            <div className="
                flex
                h-[72px]
                w-full
                items-center
                justify-center
            ">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={RELAY_MOTION.spring.responsive}
                    className="
                        flex
                        size-10
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-[13px]
                        bg-white/[0.06]
                        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                    "
                >
                    <span className="
                        relay-brand-text
                        text-[18px]
                        font-bold
                    ">
                        R
                    </span>
                </motion.div>
            </div>

            {/* Main navigation */}
            <nav className="
                flex
                w-full
                flex-1
                flex-col
                items-center
                gap-1
                px-2
            ">
                {RAIL_ITEMS.map((item) => {
                    const active = isActiveRoute(
                        location.pathname,
                        item.path,
                    );

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className="
                                group
                                relative
                                flex
                                w-full
                                justify-center
                            "
                        >
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.94 }}
                                transition={
                                    RELAY_MOTION.spring.responsive
                                }
                                className={`
                                    relative
                                    flex
                                    size-11
                                    items-center
                                    justify-center
                                    rounded-[12px]
                                    transition-colors
                                    duration-150
                                    ${
                                        active
                                            ? "bg-white/[0.08] text-white"
                                            : "text-zinc-500 hover:bg-white/[0.045] hover:text-zinc-200"
                                    }
                                `}
                            >
                                {active && (
                                    <motion.div
                                        layoutId="rail-active"
                                        className="
                                            absolute
                                            -left-[9px]
                                            h-5
                                            w-[3px]
                                            rounded-r-full
                                            bg-cyan-400
                                            shadow-[0_0_12px_rgba(34,211,238,0.7)]
                                        "
                                    />
                                )}

                                <Icon
                                    size={19}
                                    strokeWidth={active ? 2.2 : 1.8}
                                />
                            </motion.div>

                            <div className="
                                pointer-events-none
                                absolute
                                left-[62px]
                                top-1/2
                                z-[100]
                                -translate-y-1/2
                                translate-x-1
                                whitespace-nowrap
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-[#171920]
                                px-2.5
                                py-1.5
                                text-[11px]
                                font-medium
                                text-zinc-200
                                opacity-0
                                shadow-xl
                                transition-all
                                duration-150
                                group-hover:translate-x-0
                                group-hover:opacity-100
                            ">
                                {item.label}
                            </div>
                        </NavLink>
                    );
                })}

                <div className="
                    my-3
                    h-px
                    w-8
                    bg-white/[0.06]
                " />

                {/* Inbox */}
                <button
                    type="button"
                    className="
                        group
                        relative
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-[12px]
                        text-zinc-500
                        transition
                        hover:bg-white/[0.045]
                        hover:text-zinc-200
                    "
                >
                    <Inbox
                        size={19}
                        strokeWidth={1.8}
                    />

                    <span className="
                        absolute
                        right-2
                        top-2
                        size-1.5
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_8px_rgba(34,211,238,0.8)]
                    " />

                    <div className="
                        pointer-events-none
                        absolute
                        left-[62px]
                        top-1/2
                        z-[100]
                        -translate-y-1/2
                        whitespace-nowrap
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-[#171920]
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-medium
                        text-zinc-200
                        opacity-0
                        transition
                        group-hover:opacity-100
                    ">
                        Inbox
                    </div>
                </button>

                {/* More */}
                <button
                    type="button"
                    className="
                        group
                        relative
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-[12px]
                        text-zinc-500
                        transition
                        hover:bg-white/[0.045]
                        hover:text-zinc-200
                    "
                >
                    <MoreHorizontal
                        size={20}
                        strokeWidth={1.8}
                    />

                    <div className="
                        pointer-events-none
                        absolute
                        left-[62px]
                        top-1/2
                        z-[100]
                        -translate-y-1/2
                        whitespace-nowrap
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-[#171920]
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-medium
                        text-zinc-200
                        opacity-0
                        transition
                        group-hover:opacity-100
                    ">
                        More
                    </div>
                </button>
            </nav>

            {/* Bottom */}
            <div className="
                flex
                w-full
                flex-col
                items-center
                gap-1
                px-2
                pb-4
            ">
                <NavLink
                    to={SETTINGS_ITEM.path}
                    className="group relative"
                >
                    <div className="
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-[12px]
                        text-zinc-500
                        transition
                        hover:bg-white/[0.045]
                        hover:text-zinc-200
                    ">
                        <Settings
                            size={19}
                            strokeWidth={1.8}
                        />
                    </div>

                    <div className="
                        pointer-events-none
                        absolute
                        left-[62px]
                        top-1/2
                        z-[100]
                        -translate-y-1/2
                        whitespace-nowrap
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-[#171920]
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-medium
                        text-zinc-200
                        opacity-0
                        transition
                        group-hover:opacity-100
                    ">
                        Settings
                    </div>
                </NavLink>

                {/* Profile */}
                <button
                    type="button"
                    className="
                        mt-2
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-white/[0.06]
                        text-xs
                        font-semibold
                        text-zinc-300
                        transition
                        hover:border-white/[0.14]
                        hover:bg-white/[0.09]
                    "
                >
                    S
                </button>
            </div>
        </aside>
    );
};