import {
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Clock,
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
            bg-[#121316]
            text-zinc-200
            select-none
        ">
            {/* Top ClickUp-Style Command Bar Header */}
            <header className="
                flex
                h-[56px]
                shrink-0
                items-center
                justify-between
                border-b
                border-white/[0.08]
                bg-[#1b1c21]
                px-6
            ">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            px-2.5
                            py-1.5
                            text-zinc-400
                            transition-all
                            hover:bg-white/[0.06]
                            hover:text-white
                        "
                    >
                        <span className="text-[13px] font-bold text-white tracking-wide">
                            Home Dashboard
                        </span>
                        <ChevronDown size={14} className="text-zinc-500" />
                    </button>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        className="
                            hidden
                            h-8
                            items-center
                            gap-2.5
                            rounded-lg
                            border
                            border-white/[0.08]
                            bg-[#121316]
                            px-3
                            text-[11px]
                            font-medium
                            text-zinc-400
                            shadow-inner
                            transition-all
                            hover:border-[#7b68ee]/50
                            hover:text-zinc-200
                            md:flex
                        "
                    >
                        <Search size={13} className="text-zinc-500" />
                        Search workspace...
                        <kbd className="
                            rounded
                            border
                            border-white/10
                            bg-white/5
                            px-1.5
                            py-0.5
                            text-[9px]
                            font-semibold
                            text-zinc-400
                        ">
                            ⌘K
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
                            border
                            border-white/[0.08]
                            bg-[#121316]
                            text-zinc-400
                            transition-all
                            hover:bg-white/[0.06]
                            hover:text-white
                        "
                    >
                        <Command size={14} />
                    </button>
                </div>
            </header>

            {/* Main Canvas Dashboard View */}
            <main className="
                custom-scrollbar
                flex-1
                overflow-y-auto
                bg-[#121316]
            ">
                <div className="
                    mx-auto
                    w-full
                    max-w-[1440px]
                    px-6
                    pb-16
                    pt-6
                    lg:px-10
                    xl:px-12
                ">
                    {/* Greeting & Quick Action Buttons Header */}
                    <motion.section
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: RELAY_MOTION.duration.normal }}
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
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="size-2 rounded-full bg-[#00c875] animate-pulse" />
                                <p className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.12em]
                                    text-zinc-400
                                ">
                                    Workspace Overview
                                </p>
                            </div>

                            <h1 className={
                                RELAY_TYPOGRAPHY.pageTitle.className +
                                " text-2xl lg:text-3xl font-extrabold tracking-tight text-white"
                            }>
                                {HOME_GREETING.title}
                            </h1>

                            <p className="mt-1.5 text-[13px] font-medium text-zinc-400">
                                {HOME_GREETING.subtitle}
                            </p>
                        </div>

                        {/* Quick Action Pills */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {HOME_QUICK_ACTIONS.map((action) => {
                                const Icon = action.icon;

                                return (
                                    <motion.button
                                        key={action.id}
                                        type="button"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={RELAY_MOTION.spring.responsive}
                                        className="
                                            flex
                                            h-8
                                            items-center
                                            gap-2
                                            rounded-lg
                                            border
                                            border-white/[0.08]
                                            bg-[#1b1c21]
                                            px-3
                                            text-[11px]
                                            font-semibold
                                            text-zinc-300
                                            shadow-sm
                                            transition-all
                                            hover:border-[#7b68ee]/50
                                            hover:bg-[#24252d]
                                            hover:text-white
                                        "
                                    >
                                        <Icon size={14} className="text-[#7b68ee]" />
                                        {action.label}
                                        <span className="
                                            hidden
                                            rounded
                                            border
                                            border-white/10
                                            bg-white/5
                                            px-1
                                            text-[9px]
                                            font-semibold
                                            text-zinc-400
                                            lg:block
                                        ">
                                            {action.shortcut}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* High-Density ClickUp Stat Widgets */}
                    <section className="
                        mt-6
                        grid
                        grid-cols-2
                        gap-3.5
                        xl:grid-cols-4
                    ">
                        {HOME_STATS.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.04,
                                        duration: RELAY_MOTION.duration.normal,
                                    }}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-[#1b1c21]
                                        p-4
                                        shadow-lg
                                        transition-all
                                        duration-200
                                        hover:border-white/20
                                        hover:bg-[#22232a]
                                    "
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="
                                            flex
                                            size-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-[#7b68ee]/10
                                            text-[#8e7ef3]
                                            border
                                            border-[#7b68ee]/20
                                        ">
                                            <Icon size={16} />
                                        </div>

                                        <ArrowUpRight
                                            size={15}
                                            className="
                                                text-zinc-500
                                                opacity-0
                                                transition-all
                                                group-hover:opacity-100
                                                group-hover:text-white
                                            "
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-[11px] font-semibold text-zinc-400">
                                            {stat.label}
                                        </p>

                                        <div className="mt-1 flex items-baseline gap-2">
                                            <span className="text-2xl font-bold tracking-tight text-white">
                                                {stat.value}
                                            </span>

                                            <span className="
                                                rounded
                                                bg-[#00c875]/10
                                                px-1.5
                                                py-0.2
                                                text-[10px]
                                                font-bold
                                                text-[#00c875]
                                            ">
                                                {stat.change}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-[10px] text-zinc-500">
                                            {stat.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </section>

                    {/* Main Workspace Grid (My Work & Right Widgets) */}
                    <section className="
                        mt-6
                        grid
                        gap-6
                        xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]
                    ">
                        {/* My Work / Tasks Section */}
                        <div className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/[0.08]
                            bg-[#1b1c21]
                            shadow-xl
                        ">
                            <div className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-white/[0.08]
                                bg-[#22232a]
                                px-5
                                py-3.5
                            ">
                                <div>
                                    <h2 className="text-[13px] font-bold text-white tracking-wide">
                                        My Work
                                    </h2>
                                    <p className="text-[11px] text-zinc-400">
                                        Tasks and assignments that need your attention
                                    </p>
                                </div>

                                {/* ClickUp View Toggle Tabs */}
                                <div className="
                                    flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-[#121316]
                                    p-1
                                ">
                                    <button
                                        type="button"
                                        onClick={() => setActiveView("overview")}
                                        className={`
                                            rounded-md
                                            px-3
                                            py-1
                                            text-[11px]
                                            font-semibold
                                            transition-all
                                            ${
                                                activeView === "overview"
                                                    ? "bg-[#7b68ee] text-white shadow-md"
                                                    : "text-zinc-400 hover:text-white"
                                            }
                                        `}
                                    >
                                        Overview
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setActiveView("my-work")}
                                        className={`
                                            rounded-md
                                            px-3
                                            py-1
                                            text-[11px]
                                            font-semibold
                                            transition-all
                                            ${
                                                activeView === "my-work"
                                                    ? "bg-[#7b68ee] text-white shadow-md"
                                                    : "text-zinc-400 hover:text-white"
                                            }
                                        `}
                                    >
                                        My Tasks
                                    </button>

                                    <button
                                        type="button"
                                        className="
                                            ml-1
                                            flex
                                            size-6
                                            items-center
                                            justify-center
                                            rounded-md
                                            text-zinc-400
                                            hover:bg-white/10
                                            hover:text-white
                                        "
                                    >
                                        <MoreHorizontal size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Task List Items */}
                            <div className="divide-y divide-white/[0.06]">
                                {MY_WORK.map((task, index) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.035 }}
                                        className="
                                            group
                                            grid
                                            grid-cols-[auto_minmax(0,1fr)_auto]
                                            items-center
                                            gap-3.5
                                            px-5
                                            py-3.5
                                            transition-all
                                            hover:bg-white/[0.025]
                                        "
                                    >
                                        <button
                                            type="button"
                                            className="text-zinc-500 hover:text-[#00c875] transition-colors"
                                        >
                                            {task.statusType === "progress" ? (
                                                <div className="flex size-4.5 items-center justify-center rounded-full border border-blue-400/60 bg-blue-500/10">
                                                    <div className="size-1.5 rounded-full bg-blue-400 animate-ping" />
                                                </div>
                                            ) : (
                                                <CheckCircle2 size={18} className="text-zinc-600 group-hover:text-[#00c875]" />
                                            )}
                                        </button>

                                        <div className="min-w-0">
                                            <p className="truncate text-[13px] font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                                {task.title}
                                            </p>

                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-[10px] font-medium text-zinc-400">
                                                    {task.project}
                                                </span>
                                                <span className="size-1 rounded-full bg-zinc-600" />
                                                <span className="
                                                    rounded
                                                    bg-white/5
                                                    px-1.5
                                                    py-0.2
                                                    text-[10px]
                                                    font-medium
                                                    text-zinc-300
                                                ">
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="hidden items-center gap-3 sm:flex">
                                            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                                                <Clock size={12} className="text-zinc-500" />
                                                <span>{task.due}</span>
                                            </div>

                                            <span className={`
                                                rounded-full
                                                px-2
                                                py-0.5
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                ${
                                                    task.priority === "High"
                                                        ? "border border-rose-500/30 bg-rose-500/10 text-rose-400"
                                                        : task.priority === "Medium"
                                                        ? "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                                                        : "border border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
                                                }
                                            `}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    border-t
                                    border-white/[0.08]
                                    bg-[#121316]
                                    px-5
                                    py-3
                                    text-left
                                    text-[11px]
                                    font-bold
                                    text-zinc-400
                                    transition-colors
                                    hover:bg-white/[0.04]
                                    hover:text-white
                                "
                            >
                                <Plus size={14} className="text-[#7b68ee]" />
                                Create New Task
                            </button>
                        </div>

                        {/* Right Sidebar Widgets */}
                        <div className="space-y-6">
                            {/* Upcoming Agenda Card */}
                            <div className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/[0.08]
                                bg-[#1b1c21]
                                shadow-xl
                            ">
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-white/[0.08]
                                    bg-[#22232a]
                                    px-5
                                    py-3.5
                                ">
                                    <div>
                                        <h2 className="text-[13px] font-bold text-white tracking-wide">
                                            Upcoming Schedule
                                        </h2>
                                        <p className="text-[11px] text-zinc-400">
                                            Your agenda for today
                                        </p>
                                    </div>
                                    <CalendarDays size={16} className="text-[#7b68ee]" />
                                </div>

                                <div className="p-3 space-y-1">
                                    {UPCOMING.map((event) => (
                                        <div
                                            key={event.id}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                rounded-xl
                                                p-2.5
                                                transition-colors
                                                hover:bg-white/[0.04]
                                            "
                                        >
                                            <div className="
                                                size-2
                                                shrink-0
                                                rounded-full
                                                bg-[#32a0f8]
                                                shadow-[0_0_8px_rgba(50,160,248,0.6)]
                                            " />

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[12px] font-semibold text-zinc-200">
                                                    {event.title}
                                                </p>
                                                <p className="mt-0.5 text-[10px] text-zinc-400">
                                                    {event.time} · {event.duration}
                                                </p>
                                            </div>

                                            <span className="
                                                rounded
                                                border
                                                border-white/10
                                                bg-white/5
                                                px-1.5
                                                py-0.5
                                                text-[9px]
                                                font-medium
                                                text-zinc-400
                                            ">
                                                {event.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Feed Card */}
                            <div className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/[0.08]
                                bg-[#1b1c21]
                                shadow-xl
                            ">
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-white/[0.08]
                                    bg-[#22232a]
                                    px-5
                                    py-3.5
                                ">
                                    <div>
                                        <h2 className="text-[13px] font-bold text-white tracking-wide">
                                            Recent Activity
                                        </h2>
                                        <p className="text-[11px] text-zinc-400">
                                            Real-time workspace updates
                                        </p>
                                    </div>
                                    <Sparkles size={16} className="text-[#ff007a]" />
                                </div>

                                <div className="p-3 space-y-1">
                                    {RECENT_ACTIVITY.map((activity) => {
                                        const Icon = activity.icon;

                                        return (
                                            <div
                                                key={activity.id}
                                                className="
                                                    flex
                                                    gap-3
                                                    rounded-xl
                                                    p-2.5
                                                    transition-colors
                                                    hover:bg-white/[0.04]
                                                "
                                            >
                                                <div className="
                                                    flex
                                                    size-7
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-white/[0.06]
                                                    text-zinc-300
                                                ">
                                                    <Icon size={14} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[11px] leading-relaxed text-zinc-400">
                                                        <span className="font-bold text-white">
                                                            {activity.user}
                                                        </span>{" "}
                                                        {activity.action}{" "}
                                                        <span className="font-medium text-[#9d8df1]">
                                                            {activity.target}
                                                        </span>
                                                    </p>
                                                    <p className="mt-0.5 text-[9px] text-zinc-400">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RelayAI Bottom Banner Widget */}
                    <motion.section
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: RELAY_MOTION.duration.slow,
                        }}
                        className="
                            relative
                            mt-6
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#7b68ee]/30
                            bg-gradient-to-r
                            from-[#7b68ee]/15
                            via-[#1b1c21]
                            to-[#ff007a]/15
                            p-6
                            shadow-2xl
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
                            <div className="flex items-start gap-4">
                                <div className="
                                    flex
                                    size-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-tr
                                    from-[#7b68ee]
                                    to-[#ff007a]
                                    text-white
                                    shadow-lg
                                    shadow-[#7b68ee]/30
                                ">
                                    <Sparkles size={20} className="animate-pulse" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-sm font-extrabold text-white tracking-wide">
                                            Relay AI Intelligence
                                        </h2>
                                        <span className="
                                            rounded-full
                                            border
                                            border-[#7b68ee]/40
                                            bg-[#7b68ee]/20
                                            px-2
                                            py-0.5
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-widest
                                            text-[#b4a7f5]
                                        ">
                                            v1 Workspace Engine
                                        </span>
                                    </div>

                                    <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-zinc-400">
                                        Ask RelayAI to summarize your workspace activity, organize tasks, or move a project forward using automated intelligence.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="
                                    flex
                                    h-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-[#7b68ee]
                                    to-[#6552e6]
                                    px-5
                                    text-[12px]
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-[#7b68ee]/25
                                    transition-all
                                    hover:scale-[1.02]
                                    hover:shadow-[#7b68ee]/40
                                "
                            >
                                Open Relay AI
                                <ArrowUpRight size={15} />
                            </button>
                        </div>
                    </motion.section>
                </div>
            </main>
        </div>
    );
};