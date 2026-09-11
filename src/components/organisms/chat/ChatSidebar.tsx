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
        <aside className="flex h-full w-[240px] shrink-0 flex-col border-r bg-background">

            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b px-4">
                <h2 className="text-sm font-semibold">
                    Chat
                </h2>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                >
                    <MessageSquarePlus className="size-4" />
                </Button>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />

                    <Input
                        placeholder="Search..."
                        className="h-9 pl-8 text-xs"
                    />
                </div>
            </div>

            {/* Channels */}
            <div className="px-2">

                <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Channels
                </p>

                <div className="space-y-1">
                    {channels.map((channel) => (
                        <button
                            key={channel}
                            type="button"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Hash className="size-4" />

                            <span>{channel}</span>
                        </button>
                    ))}
                </div>

            </div>

            {/* Direct messages */}
            <div className="mt-4 px-2">

                <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Direct Messages
                </p>

                <div className="space-y-1">
                    {directMessages.map((user) => (
                        <button
                            key={user}
                            type="button"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <MessageSquare className="size-4" />

                            <span>{user}</span>
                        </button>
                    ))}
                </div>

            </div>

        </aside>
    );
};