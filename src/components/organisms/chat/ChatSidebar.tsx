import {
    ChevronDown,
    ChevronRight,
    Hash,
    MessageSquare,
    MessageSquarePlus,
    Plus,
    Search,
    Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { WorkspaceSwitcher } from "@/components/organisms/workspace/WorkspaceRailSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const channels = [
    "general",
    "engineering",
    "design",
    "random",
];

const directMessages = [
    "John",
    "Sarah",
];

export const ChatSidebar = () => {
    const [search, setSearch] = useState("");
    const [activeChannel, setActiveChannel] = useState("general");
    const [activeDM, setActiveDM] = useState<string | null>(null);

    const [channelsExpanded, setChannelsExpanded] = useState(true);
    const [directMessagesExpanded, setDirectMessagesExpanded] =
        useState(true);

    const filteredChannels = useMemo(
        () =>
            channels.filter((channel) =>
                channel.toLowerCase().includes(search.toLowerCase())
            ),
        [search]
    );

    const filteredDirectMessages = useMemo(
        () =>
            directMessages.filter((user) =>
                user.toLowerCase().includes(search.toLowerCase())
            ),
        [search]
    );

    const selectChannel = (channel: string): void => {
        setActiveChannel(channel);
        setActiveDM(null);
    };

    const selectDM = (user: string): void => {
        setActiveDM(user);
    };

    return (
        <aside className="relative flex h-full w-full min-w-0 flex-col overflow-hidden border-r border-white/[0.07] bg-[#111116] text-white">

            {/* Workspace header */}
            <div className="border-b border-white/[0.07] p-3">
                <WorkspaceSwitcher />
            </div>

            {/* Sidebar heading */}
            <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-white/[0.07] px-4">
                <div className="flex min-w-0 items-center gap-2">
                    <h2 className="truncate text-[15px] font-semibold tracking-tight text-white">
                        Chat
                    </h2>

                    <ChevronDown className="size-4 shrink-0 text-white/35" />
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="New message"
                    title="New message"
                    className="size-8 shrink-0 rounded-lg text-white/45 transition hover:bg-white/[0.07] hover:text-cyan-200"
                >
                    <MessageSquarePlus className="size-[17px]" />
                </Button>
            </div>

            {/* Search */}
            <div className="shrink-0 px-3 pb-2 pt-3">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" />

                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search channels and people"
                        aria-label="Search channels and direct messages"
                        className="h-9 rounded-lg border-white/[0.09] bg-white/[0.045] pl-9 pr-3 text-xs text-white placeholder:text-white/35 transition-colors focus-visible:border-cyan-300/30 focus-visible:ring-2 focus-visible:ring-cyan-300/10"
                    />
                </div>
            </div>

            {/* Scrollable navigation */}
            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4 pt-2 [scrollbar-color:rgba(255,255,255,0.12)_transparent] [scrollbar-width:thin]">

                {/* Channels section */}
                <section>
                    <div className="group flex h-9 items-center rounded-lg px-2">
                        <button
                            type="button"
                            onClick={() =>
                                setChannelsExpanded((expanded) => !expanded)
                            }
                            aria-expanded={channelsExpanded}
                            className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                        >
                            {channelsExpanded ? (
                                <ChevronDown className="size-3.5 shrink-0 text-white/35" />
                            ) : (
                                <ChevronRight className="size-3.5 shrink-0 text-white/35" />
                            )}

                            <span className="truncate text-[11px] font-semibold uppercase tracking-[0.09em] text-white/45 transition-colors group-hover:text-white/75">
                                Channels
                            </span>
                        </button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Add channel"
                            title="Add channel"
                            className="size-7 shrink-0 rounded-md text-white/35 opacity-0 transition hover:bg-white/[0.08] hover:text-cyan-200 group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <Plus className="size-4" />
                        </Button>
                    </div>

                    {channelsExpanded && (
                        <div className="mt-1 space-y-0.5">
                            {filteredChannels.map((channel) => {
                                const isActive =
                                    activeChannel === channel &&
                                    activeDM === null;

                                return (
                                    <button
                                        key={channel}
                                        type="button"
                                        onClick={() =>
                                            selectChannel(channel)
                                        }
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        className={[
                                            "group flex w-full items-center gap-2.5 rounded-lg px-3 py-[8px] text-left text-[13px] transition-all duration-150",
                                            isActive
                                                ? "bg-cyan-300/[0.10] font-medium text-cyan-100 shadow-[inset_2px_0_0_rgba(103,232,249,0.85)]"
                                                : "text-white/60 hover:bg-white/[0.045] hover:text-white/90",
                                        ].join(" ")}
                                    >
                                        <Hash
                                            className={[
                                                "size-[17px] shrink-0 transition-colors",
                                                isActive
                                                    ? "text-cyan-200"
                                                    : "text-white/35 group-hover:text-cyan-200/80",
                                            ].join(" ")}
                                        />

                                        <span className="min-w-0 flex-1 truncate">
                                            {channel}
                                        </span>
                                    </button>
                                );
                            })}

                            {filteredChannels.length === 0 && (
                                <p className="px-8 py-2 text-xs text-white/35">
                                    No matching channels
                                </p>
                            )}
                        </div>
                    )}
                </section>

                {/* Direct messages section */}
                <section className="mt-5">
                    <div className="group flex h-9 items-center rounded-lg px-2">
                        <button
                            type="button"
                            onClick={() =>
                                setDirectMessagesExpanded(
                                    (expanded) => !expanded
                                )
                            }
                            aria-expanded={directMessagesExpanded}
                            className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                        >
                            {directMessagesExpanded ? (
                                <ChevronDown className="size-3.5 shrink-0 text-white/35" />
                            ) : (
                                <ChevronRight className="size-3.5 shrink-0 text-white/35" />
                            )}

                            <span className="truncate text-[11px] font-semibold uppercase tracking-[0.09em] text-white/45 transition-colors group-hover:text-white/75">
                                Direct Messages
                            </span>
                        </button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Add direct message"
                            title="Add direct message"
                            className="size-7 shrink-0 rounded-md text-white/35 opacity-0 transition hover:bg-white/[0.08] hover:text-cyan-200 group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <Plus className="size-4" />
                        </Button>
                    </div>

                    {directMessagesExpanded && (
                        <div className="mt-1 space-y-0.5">
                            {filteredDirectMessages.map((user) => {
                                const isActive = activeDM === user;

                                return (
                                    <button
                                        key={user}
                                        type="button"
                                        onClick={() => selectDM(user)}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        className={[
                                            "group flex w-full items-center gap-2.5 rounded-lg px-3 py-[8px] text-left text-[13px] transition-all duration-150",
                                            isActive
                                                ? "bg-cyan-300/[0.10] font-medium text-cyan-100 shadow-[inset_2px_0_0_rgba(103,232,249,0.85)]"
                                                : "text-white/60 hover:bg-white/[0.045] hover:text-white/90",
                                        ].join(" ")}
                                    >
                                        <span className="relative flex size-[17px] shrink-0 items-center justify-center">
                                            <MessageSquare
                                                className={[
                                                    "size-[16px] transition-colors",
                                                    isActive
                                                        ? "text-cyan-200"
                                                        : "text-white/35 group-hover:text-cyan-200/80",
                                                ].join(" ")}
                                            />
                                        </span>

                                        <span className="min-w-0 flex-1 truncate">
                                            {user}
                                        </span>
                                    </button>
                                );
                            })}

                            {filteredDirectMessages.length === 0 && (
                                <p className="px-8 py-2 text-xs text-white/35">
                                    No matching people
                                </p>
                            )}
                        </div>
                    )}
                </section>

                {/* Browse people */}
                <div className="mt-5 border-t border-white/[0.06] pt-3">
                    <button
                        type="button"
                        className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-white/40 transition hover:bg-white/[0.045] hover:text-white/80"
                    >
                        <Users className="size-4 text-white/35 transition-colors group-hover:text-cyan-200" />
                        <span>Browse people</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};