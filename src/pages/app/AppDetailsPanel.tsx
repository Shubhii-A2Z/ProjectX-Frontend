import {
    Check,
    ExternalLink,
    ShieldCheck,
    Users,
    X,
} from "lucide-react";
import { motion } from "motion/react";

import type { RelayApp } from "@/config/apps/appCatalog";

type AppDetailsPanelProps = {
    app: RelayApp | null;
    onClose: () => void;
};

export const AppDetailsPanel = ({
    app,
    onClose,
}: AppDetailsPanelProps) => {
    if (!app) {
        return null;
    }

    return (
        <motion.aside
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
                fixed inset-y-0 right-0 z-40
                flex w-full max-w-[390px]
                flex-col border-l border-white/[0.08]
                bg-[#0b0c11]/95
                shadow-[-20px_0_60px_rgba(0,0,0,0.35)]
                backdrop-blur-xl
                sm:w-[390px]
            "
        >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-zinc-600">
                    Integration
                </span>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
                <div
                    className={`
                        flex h-14 w-14 items-center
                        justify-center rounded-2xl
                        text-lg font-bold
                        shadow-xl
                        ${app.iconClassName}
                    `}
                >
                    {app.initials}
                </div>

                <div className="mt-5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold tracking-[-0.025em] text-zinc-100">
                            {app.name}
                        </h2>

                        {app.connected && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                                <Check className="h-3 w-3 text-emerald-300" />
                            </span>
                        )}
                    </div>

                    <p className="mt-2 text-[13px] leading-6 text-zinc-500">
                        {app.description}
                    </p>
                </div>

                <div className="mt-7 space-y-2">
                    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                        <Users className="h-4 w-4 text-zinc-500" />

                        <div>
                            <p className="text-[11px] text-zinc-600">
                                Workspace usage
                            </p>
                            <p className="mt-0.5 text-[12px] font-medium text-zinc-300">
                                {app.users}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                        <ShieldCheck className="h-4 w-4 text-zinc-500" />

                        <div>
                            <p className="text-[11px] text-zinc-600">
                                Security
                            </p>
                            <p className="mt-0.5 text-[12px] font-medium text-zinc-300">
                                OAuth secured
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-zinc-600">
                        What you can do
                    </p>

                    <div className="mt-3 space-y-2">
                        {[
                            "Sync workspace activity",
                            "Receive notifications",
                            "Share app resources",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-2.5 text-[12px] text-zinc-500"
                            >
                                <Check className="h-3.5 w-3.5 text-cyan-400/70" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/[0.06] p-4">
                <button
                    type="button"
                    className="
                        flex w-full items-center
                        justify-center gap-2 rounded-xl
                        bg-white px-4 py-2.5
                        text-[12px] font-semibold
                        text-black
                        transition-transform
                        hover:bg-zinc-200
                        active:scale-[0.98]
                    "
                >
                    {app.connected ? "Manage connection" : "Connect app"}

                    <ExternalLink className="h-3.5 w-3.5" />
                </button>
            </div>
        </motion.aside>
    );
};