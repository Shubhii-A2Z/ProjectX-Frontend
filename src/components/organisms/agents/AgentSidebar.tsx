import {
    Bot,
    Plus,
    Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const agents = [
    {
        name: "Daily Briefer",
        description: "Summarize your daily priorities"
    },
    {
        name: "Priorities Manager",
        description: "Manage your important tasks"
    },
    {
        name: "Task Triage",
        description: "Review and organize new tasks"
    }
];

export const AgentSidebar = () => {
    return (
        <aside className="flex h-full w-[240px] shrink-0 flex-col border-r bg-background">

            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b px-4">
                <h2 className="text-sm font-semibold">
                    AI Agents
                </h2>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                >
                    <Plus className="size-4" />
                </Button>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />

                    <Input
                        placeholder="Search agents..."
                        className="h-9 pl-8 text-xs"
                    />
                </div>
            </div>

            {/* Agents */}
            <div className="flex-1 overflow-y-auto px-2">

                <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    My Agents
                </p>

                <div className="space-y-1">
                    {agents.map((agent) => (
                        <button
                            key={agent.name}
                            type="button"
                            className="flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
                        >
                            <Bot className="mt-0.5 size-4 shrink-0 text-primary" />

                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium">
                                    {agent.name}
                                </p>

                                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                                    {agent.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

            </div>
        </aside>
    );
};