import {
    Check,
    ChevronDown,
    Plus,
    Search,
    Settings2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import workspaceIcon from "@/assets/sidebar/workspace-icon.png";
import { WORKSPACES } from "@/config/sidebarNavigation";

export const WorkspaceRailSwitcher = () => {
    const [open, setOpen] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState(
        WORKSPACES[0],
    );
    const [search, setSearch] = useState("");

    const filteredWorkspaces = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return WORKSPACES;
        }

        return WORKSPACES.filter((workspace) =>
            workspace.name.toLowerCase().includes(query),
        );
    }, [search]);

    const handleSelect = (workspace: (typeof WORKSPACES)[number]) => {
        setSelectedWorkspace(workspace);
        setOpen(false);
        setSearch("");
    };

    return (
        <div className="relative">
            <motion.button
                type="button"
                onClick={() => setOpen((current) => !current)}
                whileTap={{
                    scale: 0.98,
                }}
                className={`
                    flex w-full items-center gap-2.5
                    rounded-xl border px-2.5 py-2
                    text-left transition-all
                    ${
                        open
                            ? "border-white/[0.12] bg-white/[0.07]"
                            : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.04]"
                    }
                `}
            >
                <div className="
                    flex size-8 shrink-0
                    items-center justify-center
                    overflow-hidden rounded-lg
                    border border-white/[0.07]
                    bg-white/[0.045]
                ">
                    <img
                        src={workspaceIcon}
                        alt=""
                        className="size-5 object-contain opacity-80"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold text-zinc-200">
                        {selectedWorkspace.name}
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-zinc-600">
                        Workspace
                    </p>
                </div>

                <ChevronDown
                    className={`
                        size-3.5 shrink-0
                        text-zinc-600
                        transition-transform
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close workspace menu"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 cursor-default"
                        />

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -6,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -6,
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.16,
                            }}
                            className="
                                absolute left-0 top-[calc(100%+8px)]
                                z-50 w-[272px]
                                overflow-hidden rounded-2xl
                                border border-white/[0.09]
                                bg-[#111219]/95
                                shadow-[0_24px_70px_rgba(0,0,0,0.45)]
                                backdrop-blur-xl
                            "
                        >
                            <div className="border-b border-white/[0.06] p-2.5">
                                <div className="
                                    flex h-9 items-center gap-2
                                    rounded-lg
                                    border border-white/[0.06]
                                    bg-white/[0.025]
                                    px-2.5
                                ">
                                    <Search className="size-3.5 text-zinc-700" />

                                    <input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        autoFocus
                                        placeholder="Find workspace..."
                                        className="
                                            min-w-0 flex-1
                                            bg-transparent
                                            text-[11px] text-zinc-300
                                            outline-none
                                            placeholder:text-zinc-700
                                        "
                                    />
                                </div>
                            </div>

                            <div className="p-1.5">
                                <p className="px-2.5 pb-1.5 pt-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-zinc-700">
                                    Workspaces
                                </p>

                                <div className="space-y-0.5">
                                    {filteredWorkspaces.map((workspace) => {
                                        const selected =
                                            workspace.id ===
                                            selectedWorkspace.id;

                                        return (
                                            <button
                                                key={workspace.id}
                                                type="button"
                                                onClick={() =>
                                                    handleSelect(workspace)
                                                }
                                                className="
                                                    group flex w-full
                                                    items-center gap-2.5
                                                    rounded-lg px-2.5 py-2
                                                    text-left
                                                    transition-colors
                                                    hover:bg-white/[0.05]
                                                "
                                            >
                                                <div className="
                                                    flex size-7 shrink-0
                                                    items-center justify-center
                                                    rounded-lg
                                                    bg-white/[0.045]
                                                    text-[9px] font-semibold
                                                    text-zinc-400
                                                ">
                                                    {workspace.name
                                                        .slice(0, 1)
                                                        .toUpperCase()}
                                                </div>

                                                <span className="
                                                    min-w-0 flex-1
                                                    truncate text-[11px]
                                                    font-medium text-zinc-400
                                                    group-hover:text-zinc-200
                                                ">
                                                    {workspace.name}
                                                </span>

                                                {selected && (
                                                    <Check className="size-3.5 text-cyan-400" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-white/[0.06] p-1.5">
                                <button
                                    type="button"
                                    className="
                                        flex w-full items-center gap-2.5
                                        rounded-lg px-2.5 py-2
                                        text-left text-zinc-500
                                        transition-colors
                                        hover:bg-white/[0.05]
                                        hover:text-zinc-300
                                    "
                                >
                                    <div className="
                                        flex size-7 items-center
                                        justify-center rounded-lg
                                        bg-white/[0.035]
                                    ">
                                        <Plus className="size-3.5" />
                                    </div>

                                    <span className="text-[11px] font-medium">
                                        Create workspace
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="
                                        flex w-full items-center gap-2.5
                                        rounded-lg px-2.5 py-2
                                        text-left text-zinc-600
                                        transition-colors
                                        hover:bg-white/[0.05]
                                        hover:text-zinc-400
                                    "
                                >
                                    <Settings2 className="ml-1 size-3.5" />

                                    <span className="text-[11px] font-medium">
                                        Workspace settings
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};