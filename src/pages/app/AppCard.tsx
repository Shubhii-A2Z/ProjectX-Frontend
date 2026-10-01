import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";

import type { RelayApp } from "@/config/apps/appCatalog";

type AppCardProps = {
    app: RelayApp;
    onSelect: (app: RelayApp) => void;
};

export const AppCard = ({ app, onSelect }: AppCardProps) => {
    return (
        <motion.button
            type="button"
            onClick={() => onSelect(app)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.16 }}
            className="
                group relative flex min-h-[178px]
                flex-col overflow-hidden rounded-2xl
                border border-white/[0.07]
                bg-[#0e0f15]
                p-4 text-left
                shadow-[0_8px_30px_rgba(0,0,0,0.14)]
                transition-colors
                hover:border-white/[0.13]
                hover:bg-[#111219]
            "
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-300 group-hover:via-cyan-400/40" />

            <div className="flex items-start justify-between">
                <div
                    className={`
                        flex h-10 w-10 items-center
                        justify-center rounded-xl
                        text-[13px] font-bold
                        shadow-lg
                        ${app.iconClassName}
                    `}
                >
                    {app.initials}
                </div>

                {app.connected ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/[0.07] px-2 py-1 text-[10px] font-medium text-emerald-300">
                        <Check className="h-3 w-3" />
                        Connected
                    </span>
                ) : (
                    <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-zinc-400" />
                )}
            </div>

            <div className="mt-5">
                <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-zinc-100">
                        {app.name}
                    </h3>

                    {app.popular && (
                        <span className="rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                            Popular
                        </span>
                    )}
                </div>

                <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-zinc-500">
                    {app.description}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-[10px] font-medium text-zinc-600">
                    {app.category}
                </span>

                <span className="text-[10px] text-zinc-600">
                    {app.users}
                </span>
            </div>
        </motion.button>
    );
};