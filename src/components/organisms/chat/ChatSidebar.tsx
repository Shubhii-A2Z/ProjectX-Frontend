import {
    Hash,
    MessageSquare,
    MessageSquarePlus,
    Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const channels = [
    "general",
    "engineering",
    "design",
    "random"
];

const directMessages = [
    "John",
    "Sarah"
];

export const ChatSidebar = () => {
    return (
        <aside className="flex h-full w-full min-w-0 flex-col bg-[#111111] text-white">

            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
                <h2 className="text-sm font-semibold">
                    Chat
                </h2>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-white/60 hover:bg-white/10 hover:text-white"
                >
                    <MessageSquarePlus className="size-4" />
                </Button>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-white/30" />

                    <Input
                        placeholder="Search..."
                        className="h-9 border-white/10 bg-white/5 pl-8 text-xs text-white placeholder:text-white/30 focus-visible:ring-white/20"
                    />
                </div>
            </div>

            {/* Channels */}
            <div className="px-2">

                <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Channels
                </p>

                <div className="space-y-1">
                    {channels.map((channel) => (
                        <button
                            key={channel}
                            type="button"
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-white/55 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        >
                            <Hash className="size-4 transition-all duration-200 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                            <span>
                                {channel}
                            </span>
                        </button>
                    ))}
                </div>

            </div>

            {/* Direct messages */}
            <div className="mt-4 px-2">

                <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Direct Messages
                </p>

                <div className="space-y-1">
                    {directMessages.map((user) => (
                        <button
                            key={user}
                            type="button"
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-white/55 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        >
                            <MessageSquare className="size-4 transition-all duration-200 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                            <span>
                                {user}
                            </span>
                        </button>
                    ))}
                </div>

            </div>

        </aside>
    );
};