import {
    ChevronDown,
    Filter,
    LayoutGrid,
    Search,
    SlidersHorizontal,
    Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import {
    APP_CATEGORIES,
    type AppCategory,
    RELAY_APPS,
    type RelayApp,
} from "@/config/apps/appCatalog";

import { AppCard } from "./AppCard";
import { AppDetailsPanel } from "./AppDetailsPanel";
import { AppsSidebar } from "./AppsSidebar";

export const AppsPage = () => {
    const [activeItem, setActiveItem] = useState("overview");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<AppCategory | "All">("All");
    const [selectedApp, setSelectedApp] = useState<RelayApp | null>(null);

    const filteredApps = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return RELAY_APPS.filter((app) => {
            const matchesCategory =
                category === "All" || app.category === category;

            const matchesSearch =
                !normalizedSearch ||
                app.name.toLowerCase().includes(normalizedSearch) ||
                app.description.toLowerCase().includes(normalizedSearch) ||
                app.category.toLowerCase().includes(normalizedSearch);

            const matchesSection =
                activeItem === "connected"
                    ? app.connected
                    : activeItem === "installed"
                      ? app.connected
                      : activeItem === "discover"
                        ? !app.connected
                        : activeItem === "communication"
                          ? app.category === "Communication"
                          : activeItem === "development"
                            ? app.category === "Development"
                            : activeItem === "design"
                              ? app.category === "Design"
                              : activeItem === "productivity"
                                ? app.category === "Productivity"
                                : true;

            return matchesCategory && matchesSearch && matchesSection;
        });
    }, [activeItem, category, search]);

    const connectedCount = RELAY_APPS.filter(
        (app) => app.connected,
    ).length;

    return (
        <div className="flex h-full min-w-0 bg-[#07080c] text-white">
            <AppsSidebar
                activeItem={activeItem}
                onItemChange={(item) => {
                    setActiveItem(item);

                    if (
                        [
                            "communication",
                            "development",
                            "design",
                            "productivity",
                        ].includes(item)
                    ) {
                        const categoryMap: Record<string, AppCategory> = {
                            communication: "Communication",
                            development: "Development",
                            design: "Design",
                            productivity: "Productivity",
                        };

                        setCategory(categoryMap[item]);
                    } else {
                        setCategory("All");
                    }
                }}
            />

            <main className="min-w-0 flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-[1380px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22 }}
                    >
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-600">
                                    <LayoutGrid className="h-3.5 w-3.5" />
                                    Workspace
                                    <span>/</span>
                                    Apps
                                </div>

                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10">
                                        <Sparkles className="h-4.5 w-4.5 text-cyan-300" />
                                    </div>

                                    <div>
                                        <h1 className="text-[24px] font-semibold tracking-[-0.035em] text-zinc-100">
                                            App Center
                                        </h1>

                                        <p className="mt-1 text-[13px] text-zinc-600">
                                            Connect the tools that power your
                                            workspace.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                    <span className="text-[11px] text-zinc-500">
                                        {connectedCount} connected
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-[11px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-200"
                                >
                                    <SlidersHorizontal className="h-3.5 w-3.5" />
                                    Manage
                                </button>
                            </div>
                        </div>

                        <div className="mt-7 flex flex-col gap-3 xl:flex-row">
                            <div className="relative flex-1">
                                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search apps..."
                                    className="
                                        h-11 w-full rounded-xl
                                        border border-white/[0.07]
                                        bg-[#0e0f15]
                                        pl-10 pr-4
                                        text-[13px] text-zinc-200
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition-colors
                                        focus:border-cyan-400/20
                                        focus:bg-[#101118]
                                    "
                                />

                                <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-white/[0.06] px-1.5 py-0.5 text-[9px] text-zinc-700 sm:flex">
                                    <span>⌘</span>
                                    <span>K</span>
                                </div>
                            </div>

                            <div className="flex gap-2 overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setCategory("All")}
                                    className={`
                                        flex h-11 shrink-0 items-center gap-2
                                        rounded-xl border px-3.5
                                        text-[11px] font-medium
                                        transition-colors
                                        ${
                                            category === "All"
                                                ? "border-white/[0.11] bg-white/[0.07] text-zinc-100"
                                                : "border-white/[0.07] bg-white/[0.025] text-zinc-500 hover:bg-white/[0.05]"
                                        }
                                    `}
                                >
                                    <Filter className="h-3.5 w-3.5" />
                                    All apps
                                </button>

                                {APP_CATEGORIES.slice(0, 4).map(
                                    (item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() =>
                                                setCategory(item)
                                            }
                                            className={`
                                                flex h-11 shrink-0
                                                items-center gap-2
                                                rounded-xl border px-3.5
                                                text-[11px] font-medium
                                                transition-colors
                                                ${
                                                    category === item
                                                        ? "border-white/[0.11] bg-white/[0.07] text-zinc-100"
                                                        : "border-white/[0.07] bg-white/[0.025] text-zinc-500 hover:bg-white/[0.05]"
                                                }
                                            `}
                                        >
                                            {item}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-9">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-zinc-600">
                                    {activeItem === "connected"
                                        ? "Connected apps"
                                        : activeItem === "discover"
                                          ? "Discover"
                                          : "Available integrations"}
                                </p>

                                <p className="mt-1 text-[12px] text-zinc-700">
                                    {filteredApps.length} integrations
                                </p>
                            </div>

                            <button
                                type="button"
                                className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:text-zinc-300"
                            >
                                Recently added
                                <ChevronDown className="h-3 w-3" />
                            </button>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {filteredApps.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                                >
                                    {filteredApps.map((app, index) => (
                                        <motion.div
                                            key={app.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.18,
                                                delay: Math.min(
                                                    index * 0.025,
                                                    0.15,
                                                ),
                                            }}
                                        >
                                            <AppCard
                                                app={app}
                                                onSelect={setSelectedApp}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.015]"
                                >
                                    <Search className="h-5 w-5 text-zinc-700" />

                                    <p className="mt-4 text-[13px] font-medium text-zinc-400">
                                        No apps found
                                    </p>

                                    <p className="mt-1 text-[11px] text-zinc-700">
                                        Try another search or category.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {selectedApp && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close app details"
                            onClick={() => setSelectedApp(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px]"
                        />

                        <AppDetailsPanel
                            app={selectedApp}
                            onClose={() => setSelectedApp(null)}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};