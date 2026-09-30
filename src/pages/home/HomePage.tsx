import {
    ArrowUpRight,
    CalendarDays,
    ChevronDown,
    Command,
    MoreHorizontal,
    Plus,
    Search,
    Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import {
    RELAY_MOTION,
    RELAY_TYPOGRAPHY,
} from "@/config/design";
import {
    HOME_GREETING,
    HOME_QUICK_ACTIONS,
    HOME_STATS,
    MY_WORK,
    RECENT_ACTIVITY,
    UPCOMING,
} from "@/config/homeDashboard";

export const HomePage = () => {
    const [activeView, setActiveView] = useState<
        "overview" | "my-work"
    >("overview");

    return (
        <div className="
            flex
            h-full
            min-w-0
            flex-col
            overflow-hidden
            bg-[#07080c]
        ">
            {/* Top command bar */}
            <header className="
                flex
                h-[64px]
                shrink-0
                items-center
                justify-between
                border-b
                border-white/[0.06]
                px-6
            ">
                <div className="
                    flex
                    items-center
                    gap-2
                ">
                    <button
                        type="button"
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            px-2
                            py-1.5
                            text-zinc-500
                            transition
                            hover:bg-white/[0.04]
                            hover:text-zinc-300
                        "
                    >
                        <span className="
                            text-[12px]
                            font-medium
                        ">
                            Home
                        </span>

                        <ChevronDown size={13} />
                    </button>
                </div>

                <div className="
                    flex
                    items-center
                    gap-2
                ">
                    <button
                        type="button"
                        className="
                            hidden
                            h-8
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            px-3
                            text-[11px]
                            text-zinc-500
                            transition
                            hover:border-white/[0.12]
                            hover:text-zinc-300
                            md:flex
                        "
                    >
                        <Search size={13} />

                        Search

                        <kbd className="
                            rounded
                            border
                            border-white/[0.07]
                            px-1
                            text-[9px]
                            text-zinc-700
                        ">
                            ⌘ K
                        </kbd>
                    </button>

                    <button
                        type="button"
                        className="
                            flex
                            size-8
                            items-center
                            justify-center
                            rounded-lg
                            text-zinc-600
                            transition
                            hover:bg-white/[0.05]
                            hover:text-zinc-300
                        "
                    >
                        <Command size={15} />
                    </button>
                </div>
            </header>

            {/* Main canvas */}
            <main className="
                flex-1
                overflow-y-auto
            ">
                <div className="
                    mx-auto
                    w-full
                    max-w-[1440px]
                    px-6
                    pb-16
                    pt-8
                    lg:px-10
                    xl:px-12
                ">
                    {/* Greeting */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration:
                                RELAY_MOTION.duration.normal,
                        }}
                        className="
                            flex
                            flex-col
                            gap-6
                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                        "
                    >
                        <div>
                            <p className="
                                mb-2
                                text-[11px]
                                font-medium
                                uppercase
                                tracking-[0.12em]
                                text-zinc-600
                            ">
                                Workspace overview
                            </p>

                            <h1
                                className={
                                    RELAY_TYPOGRAPHY.pageTitle.className +
                                    " text-zinc-100"
                                }
                            >
                                {HOME_GREETING.title}
                            </h1>

                            <p className="
                                mt-2
                                text-[13px]
                                text-zinc-500
                            ">
                                {HOME_GREETING.subtitle}
                            </p>
                        </div>

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">
                            {HOME_QUICK_ACTIONS.map(
                                (action) => {
                                    const Icon =
                                        action.icon;

                                    return (
                                        <motion.button
                                            key={action.id}
                                            type="button"
                                            whileHover={{
                                                y: -1,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            transition={
                                                RELAY_MOTION.spring
                                                    .responsive
                                            }
                                            className="
                                                flex
                                                h-9
                                                items-center
                                                gap-2
                                                rounded-[9px]
                                                border
                                                border-white/[0.07]
                                                bg-white/[0.025]
                                                px-3
                                                text-[11px]
                                                font-medium
                                                text-zinc-400
                                                transition
                                                hover:border-white/[0.12]
                                                hover:bg-white/[0.05]
                                                hover:text-zinc-200
                                            "
                                        >
                                            <Icon size={14} />

                                            {action.label}

                                            <span className="
                                                hidden
                                                rounded
                                                border
                                                border-white/[0.07]
                                                px-1
                                                text-[9px]
                                                text-zinc-700
                                                lg:block
                                            ">
                                                {action.shortcut}
                                            </span>
                                        </motion.button>
                                    );
                                },
                            )}
                        </div>
                    </motion.section>

                    {/* Stats */}
                    <section className="
                        mt-8
                        grid
                        grid-cols-2
                        gap-3
                        xl:grid-cols-4
                    ">
                        {HOME_STATS.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={stat.id}
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay:
                                            index * 0.04,
                                        duration:
                                            RELAY_MOTION.duration
                                                .normal,
                                    }}
                                    className="
                                        relay-surface
                                        relay-interactive
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[14px]
                                        p-4
                                    "
                                >
                                    <div className="
                                        flex
                                        items-start
                                        justify-between
                                    ">
                                        <div className="
                                            flex
                                            size-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-white/[0.045]
                                            text-zinc-500
                                        ">
                                            <Icon size={15} />
                                        </div>

                                        <ArrowUpRight
                                            size={14}
                                            className="
                                                text-zinc-700
                                                opacity-0
                                                transition
                                                group-hover:opacity-100
                                            "
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <p className="
                                            text-[11px]
                                            text-zinc-600
                                        ">
                                            {stat.label}
                                        </p>

                                        <div className="
                                            mt-1
                                            flex
                                            items-baseline
                                            gap-2
                                        ">
                                            <span className="
                                                text-2xl
                                                font-semibold
                                                tracking-[-0.03em]
                                                text-zinc-100
                                            ">
                                                {stat.value}
                                            </span>

                                            <span className="
                                                text-[10px]
                                                font-medium
                                                text-cyan-400/80
                                            ">
                                                {stat.change}
                                            </span>
                                        </div>

                                        <p className="
                                            mt-0.5
                                            text-[10px]
                                            text-zinc-700
                                        ">
                                            {stat.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </section>

                    {/* Main grid */}
                    <section className="
                        mt-6
                        grid
                        gap-6
                        xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.8fr)]
                    ">
                        {/* My work */}
                        <div className="
                            relay-surface
                            overflow-hidden
                            rounded-[16px]
                        ">
                            <div className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-white/[0.06]
                                px-5
                                py-4
                            ">
                                <div>
                                    <h2 className="
                                        text-[13px]
                                        font-semibold
                                        text-zinc-200
                                    ">
                                        My Work
                                    </h2>

                                    <p className="
                                        mt-1
                                        text-[10px]
                                        text-zinc-600
                                    ">
                                        Tasks that need your attention
                                    </p>
                                </div>

                                <div className="
                                    flex
                                    items-center
                                    gap-1
                                ">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveView(
                                                "overview",
                                            )
                                        }
                                        className={`
                                            rounded-md
                                            px-2.5
                                            py-1.5
                                            text-[10px]
                                            font-medium
                                            transition
                                            ${
                                                activeView ===
                                                "overview"
                                                    ? "bg-white/[0.07] text-zinc-200"
                                                    : "text-zinc-600 hover:text-zinc-400"
                                            }
                                        `}
                                    >
                                        Overview
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveView(
                                                "my-work",
                                            )
                                        }
                                        className={`
                                            rounded-md
                                            px-2.5
                                            py-1.5
                                            text-[10px]
                                            font-medium
                                            transition
                                            ${
                                                activeView ===
                                                "my-work"
                                                    ? "bg-white/[0.07] text-zinc-200"
                                                    : "text-zinc-600 hover:text-zinc-400"
                                            }
                                        `}
                                    >
                                        My tasks
                                    </button>

                                    <button
                                        type="button"
                                        className="
                                            ml-1
                                            flex
                                            size-7
                                            items-center
                                            justify-center
                                            rounded-md
                                            text-zinc-600
                                            transition
                                            hover:bg-white/[0.05]
                                            hover:text-zinc-300
                                        "
                                    >
                                        <MoreHorizontal size={15} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                {MY_WORK.map(
                                    (task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.035,
                                            }}
                                            className="
                                                group
                                                grid
                                                grid-cols-[auto_minmax(0,1fr)_auto]
                                                items-center
                                                gap-3
                                                border-b
                                                border-white/[0.045]
                                                px-5
                                                py-3.5
                                                last:border-b-0
                                                hover:bg-white/[0.018]
                                            "
                                        >
                                            <button
                                                type="button"
                                                className="
                                                    text-zinc-700
                                                    transition
                                                    hover:text-cyan-400
                                                "
                                            >
                                                {task.statusType ===
                                                "progress" ? (
                                                    <div className="
                                                        flex
                                                        size-4
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        border-cyan-400/40
                                                    ">
                                                        <div className="
                                                            size-1.5
                                                            rounded-full
                                                            bg-cyan-400
                                                        " />
                                                    </div>
                                                ) : (
                                                    <div className="
                                                        size-4
                                                        rounded-full
                                                        border
                                                        border-zinc-700
                                                    " />
                                                )}
                                            </button>

                                            <div className="
                                                min-w-0
                                            ">
                                                <p className="
                                                    truncate
                                                    text-[12px]
                                                    font-medium
                                                    text-zinc-300
                                                    transition
                                                    group-hover:text-zinc-100
                                                ">
                                                    {task.title}
                                                </p>

                                                <div className="
                                                    mt-1
                                                    flex
                                                    items-center
                                                    gap-2
                                                ">
                                                    <span className="
                                                        text-[10px]
                                                        text-zinc-700
                                                    ">
                                                        {task.project}
                                                    </span>

                                                    <span className="
                                                        size-0.5
                                                        rounded-full
                                                        bg-zinc-700
                                                    " />

                                                    <span className="
                                                        text-[10px]
                                                        text-zinc-700
                                                    ">
                                                        {task.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="
                                                hidden
                                                items-center
                                                gap-4
                                                sm:flex
                                            ">
                                                <span className="
                                                    text-[10px]
                                                    text-zinc-600
                                                ">
                                                    {task.due}
                                                </span>

                                                <span
                                                    className={`
                                                        text-[9px]
                                                        font-medium
                                                        ${
                                                            task.priority ===
                                                            "High"
                                                                ? "text-rose-400/80"
                                                                : task.priority ===
                                                                    "Medium"
                                                                  ? "text-amber-400/70"
                                                                  : "text-zinc-600"
                                                        }
                                                    `}
                                                >
                                                    {task.priority}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ),
                                )}
                            </div>

                            <button
                                type="button"
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    border-t
                                    border-white/[0.06]
                                    px-5
                                    py-3
                                    text-left
                                    text-[10px]
                                    font-medium
                                    text-zinc-600
                                    transition
                                    hover:bg-white/[0.025]
                                    hover:text-zinc-300
                                "
                            >
                                <Plus size={13} />
                                Add task
                            </button>
                        </div>

                        {/* Right column */}
                        <div className="
                            space-y-6
                        ">
                            {/* Upcoming */}
                            <div className="
                                relay-surface
                                overflow-hidden
                                rounded-[16px]
                            ">
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-white/[0.06]
                                    px-5
                                    py-4
                                ">
                                    <div>
                                        <h2 className="
                                            text-[13px]
                                            font-semibold
                                            text-zinc-200
                                        ">
                                            Upcoming
                                        </h2>

                                        <p className="
                                            mt-1
                                            text-[10px]
                                            text-zinc-600
                                        ">
                                            Your schedule today
                                        </p>
                                    </div>

                                    <CalendarDays
                                        size={15}
                                        className="text-zinc-600"
                                    />
                                </div>

                                <div className="p-2">
                                    {UPCOMING.map(
                                        (event) => (
                                            <div
                                                key={event.id}
                                                className="
                                                    flex
                                                    gap-3
                                                    rounded-[10px]
                                                    px-3
                                                    py-3
                                                    transition
                                                    hover:bg-white/[0.03]
                                                "
                                            >
                                                <div className="
                                                    mt-1
                                                    size-1.5
                                                    shrink-0
                                                    rounded-full
                                                    bg-cyan-400
                                                    shadow-[0_0_8px_rgba(34,211,238,0.45)]
                                                " />

                                                <div className="
                                                    min-w-0
                                                    flex-1
                                                ">
                                                    <p className="
                                                        truncate
                                                        text-[11px]
                                                        font-medium
                                                        text-zinc-300
                                                    ">
                                                        {event.title}
                                                    </p>

                                                    <p className="
                                                        mt-1
                                                        text-[9px]
                                                        text-zinc-600
                                                    ">
                                                        {event.time}
                                                        {" · "}
                                                        {event.duration}
                                                    </p>
                                                </div>

                                                <span className="
                                                    text-[9px]
                                                    text-zinc-700
                                                ">
                                                    {event.type}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Activity */}
                            <div className="
                                relay-surface
                                overflow-hidden
                                rounded-[16px]
                            ">
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-white/[0.06]
                                    px-5
                                    py-4
                                ">
                                    <div>
                                        <h2 className="
                                            text-[13px]
                                            font-semibold
                                            text-zinc-200
                                        ">
                                            Recent activity
                                        </h2>

                                        <p className="
                                            mt-1
                                            text-[10px]
                                            text-zinc-600
                                        ">
                                            What's happening in Relay
                                        </p>
                                    </div>

                                    <Sparkles
                                        size={15}
                                        className="text-violet-400/60"
                                    />
                                </div>

                                <div className="p-2">
                                    {RECENT_ACTIVITY.map(
                                        (activity) => {
                                            const Icon =
                                                activity.icon;

                                            return (
                                                <div
                                                    key={
                                                        activity.id
                                                    }
                                                    className="
                                                        flex
                                                        gap-3
                                                        rounded-[10px]
                                                        px-3
                                                        py-3
                                                        transition
                                                        hover:bg-white/[0.03]
                                                    "
                                                >
                                                    <div className="
                                                        flex
                                                        size-7
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-white/[0.045]
                                                        text-zinc-600
                                                    ">
                                                        <Icon
                                                            size={13}
                                                        />
                                                    </div>

                                                    <div className="
                                                        min-w-0
                                                        flex-1
                                                    ">
                                                        <p className="
                                                            text-[10px]
                                                            leading-4
                                                            text-zinc-500
                                                        ">
                                                            <span className="
                                                                font-medium
                                                                text-zinc-300
                                                            ">
                                                                {
                                                                    activity.user
                                                                }
                                                            </span>{" "}
                                                            {
                                                                activity.action
                                                            }{" "}
                                                            <span className="
                                                                text-zinc-400
                                                            ">
                                                                {
                                                                    activity.target
                                                                }
                                                            </span>
                                                        </p>

                                                        <p className="
                                                            mt-0.5
                                                            text-[9px]
                                                            text-zinc-700
                                                        ">
                                                            {
                                                                activity.time
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AI workspace banner */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.15,
                            duration:
                                RELAY_MOTION.duration.slow,
                        }}
                        className="
                            relay-ai-surface
                            mt-6
                            rounded-[18px]
                            p-5
                            sm:p-6
                        "
                    >
                        <div className="
                            relative
                            z-10
                            flex
                            flex-col
                            gap-5
                            md:flex-row
                            md:items-center
                            md:justify-between
                        ">
                            <div className="
                                flex
                                items-start
                                gap-4
                            ">
                                <div className="
                                    relay-brand-gradient
                                    flex
                                    size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[12px]
                                    shadow-[0_0_25px_rgba(139,92,246,0.16)]
                                ">
                                    <Sparkles
                                        size={18}
                                        className="text-white"
                                    />
                                </div>

                                <div>
                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                    ">
                                        <h2 className="
                                            text-[13px]
                                            font-semibold
                                            text-zinc-100
                                        ">
                                            RelayAI
                                        </h2>

                                        <span className="
                                            rounded-full
                                            border
                                            border-violet-400/10
                                            bg-violet-400/[0.05]
                                            px-1.5
                                            py-0.5
                                            text-[8px]
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-violet-300
                                        ">
                                            Intelligence
                                        </span>
                                    </div>

                                    <p className="
                                        mt-1
                                        max-w-xl
                                        text-[11px]
                                        leading-5
                                        text-zinc-500
                                    ">
                                        Ask RelayAI to summarize
                                        your workspace, organize
                                        tasks, or help move a
                                        project forward.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="
                                    flex
                                    h-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-[9px]
                                    bg-white/[0.07]
                                    px-4
                                    text-[11px]
                                    font-medium
                                    text-zinc-200
                                    transition
                                    hover:bg-white/[0.11]
                                "
                            >
                                Open RelayAI
                                <ArrowUpRight size={13} />
                            </button>
                        </div>
                    </motion.section>
                </div>
            </main>
        </div>
    );
};