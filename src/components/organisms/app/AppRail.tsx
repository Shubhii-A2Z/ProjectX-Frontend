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
        label: "AI",
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
        <aside className="flex h-full w-[68px] shrink-0 flex-col items-center border-r bg-muted/20 py-3">
            
            {/* Relay logo */}
            <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                R
            </div>

            {/* Main navigation */}
            <nav className="flex flex-1 flex-col items-center gap-2">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "group flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )
                            }
                        >
                            <Icon className="size-[19px]" />

                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Settings */}
            <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                    cn(
                        "flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] transition-all",
                        isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                }
            >
                <Settings className="size-[19px]" />
                <span>Settings</span>
            </NavLink>
        </aside>
    );
};