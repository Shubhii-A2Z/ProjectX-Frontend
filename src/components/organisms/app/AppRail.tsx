import {
    Bot,
    MessageSquare,
    Settings,
    Users
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const navigation = [
    {
        label: "Chat",
        icon: MessageSquare,
        path: "/app/chat"
    },
    {
        label: "Agents",
        icon: Bot,
        path: "/app/agents"
    },
    {
        label: "Team",
        icon: Users,
        path: "/app/team"
    }
];

export const AppRail = () => {
    return (
        <aside className="flex h-full w-[68px] shrink-0 flex-col items-center border-r border-white/10 bg-black py-3 text-white">

            {/* Relay logo */}
            <NavLink
                to="/app/chat"
                className="mb-8 flex size-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-black shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
                R
            </NavLink>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col items-center gap-2">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "group flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] transition-all duration-200",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-white/50 hover:bg-white/5 hover:text-white"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={cn(
                                            "size-[20px] transition-all duration-200",
                                            isActive
                                                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                                                : "group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_9px_rgba(34,211,238,0.9)]"
                                        )}
                                    />

                                    <span>
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Settings */}
            <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                    cn(
                        "group flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] transition-all duration-200",
                        isActive
                            ? "bg-white/10 text-white"
                            : "text-white/50 hover:bg-white/5 hover:text-white"
                    )
                }
            >
                {({ isActive }) => (
                    <>
                        <Settings
                            className={cn(
                                "size-[20px] transition-all duration-200",
                                isActive
                                    ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                                    : "group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_9px_rgba(34,211,238,0.9)]"
                            )}
                        />

                        <span>
                            Settings
                        </span>
                    </>
                )}
            </NavLink>
        </aside>
    );
};