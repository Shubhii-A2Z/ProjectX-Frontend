import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import {
    APPS_NAVIGATION,
    APPS_SIDEBAR_FOOTER,
} from "@/config/apps/appNavigation";

type AppsSidebarProps = {
    activeItem: string;
    onItemChange: (item: string) => void;
};

export const AppsSidebar = ({
    activeItem,
    onItemChange,
}: AppsSidebarProps) => {
    const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

    const toggleSection = (sectionId: string) => {
        setCollapsedSections((current) =>
            current.includes(sectionId)
                ? current.filter((id) => id !== sectionId)
                : [...current, sectionId],
        );
    };

    return (
        <aside className="hidden w-[238px] shrink-0 border-r border-white/[0.06] bg-[#0a0b10] lg:flex lg:flex-col">
            <div className="flex h-full flex-col">
                <div className="px-4 pb-3 pt-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                                Workspace
                            </p>

                            <h2 className="mt-1 text-[15px] font-semibold tracking-[-0.01em] text-zinc-100">
                                Apps
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2.5 pb-4">
                    <div className="space-y-5">
                        {APPS_NAVIGATION.map((section) => {
                            const collapsed = collapsedSections.includes(
                                section.id,
                            );

                            return (
                                <div key={section.id}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleSection(section.id)
                                        }
                                        className="mb-1 flex w-full items-center gap-1 px-2 py-1 text-left"
                                    >
                                        <motion.div
                                            animate={{
                                                rotate: collapsed ? 0 : 90,
                                            }}
                                            transition={{ duration: 0.16 }}
                                        >
                                            <ChevronRight className="h-3 w-3 text-zinc-600" />
                                        </motion.div>

                                        <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-zinc-600">
                                            {section.label}
                                        </span>
                                    </button>

                                    {!collapsed && (
                                        <div className="space-y-0.5">
                                            {section.items.map((item) => {
                                                const Icon = item.icon;
                                                const active =
                                                    activeItem === item.id;

                                                return (
                                                    <motion.button
                                                        key={item.id}
                                                        type="button"
                                                        onClick={() =>
                                                            onItemChange(
                                                                item.id,
                                                            )
                                                        }
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                        className={`
                                                            group relative flex
                                                            w-full items-center
                                                            gap-2.5 rounded-lg
                                                            px-2.5 py-2
                                                            text-left
                                                            transition-colors
                                                            ${
                                                                active
                                                                    ? "bg-white/[0.07] text-zinc-100"
                                                                    : "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-300"
                                                            }
                                                        `}
                                                    >
                                                        {active && (
                                                            <motion.div
                                                                layoutId="apps-sidebar-active"
                                                                className="absolute left-0 h-5 w-[2px] rounded-full bg-cyan-400"
                                                            />
                                                        )}

                                                        <Icon
                                                            className={`
                                                                h-4 w-4
                                                                ${
                                                                    active
                                                                        ? "text-cyan-300"
                                                                        : "text-zinc-600 group-hover:text-zinc-400"
                                                                }
                                                            `}
                                                        />

                                                        <span className="text-[13px] font-medium">
                                                            {item.label}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-white/[0.06] p-3">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                        <div className="flex items-start gap-2.5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20">
                                <APPS_SIDEBAR_FOOTER.icon className="h-3.5 w-3.5 text-cyan-300" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[12px] font-medium text-zinc-300">
                                    {APPS_SIDEBAR_FOOTER.title}
                                </p>

                                <p className="mt-1 text-[11px] leading-4 text-zinc-600">
                                    {APPS_SIDEBAR_FOOTER.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};