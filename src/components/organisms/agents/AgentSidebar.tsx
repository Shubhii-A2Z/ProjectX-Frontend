import {
    Plus,
    Sparkles
} from "lucide-react";

import relayAiLogo from "@/assets/relay-ai-logo.png";
import { Button } from "@/components/ui/button";
import { isProduction } from "@/utils/environment";

export const AgentSidebar = () => {
    if (isProduction) {
    return (
        <aside className="flex h-full w-full min-w-0 flex-col bg-[#111111] text-white">

            <div className="flex h-14 items-center border-b border-white/10 px-4">
                <h2 className="text-sm font-semibold">
                    AI Agents
                </h2>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

                <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                    <img
                        src={relayAiLogo}
                        alt="RelayAI"
                        className="size-full object-contain"
                    />
                </div>

                <p className="text-sm font-semibold">
                    RelayAI
                </p>

                <p className="mt-2 text-xs leading-5 text-white/40">
                    AI Agents are coming soon
                    with Relay v2.
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-400/5 px-3 py-1.5 text-[10px] font-medium text-purple-300">
                    <Sparkles className="size-3" />
                    Coming Soon
                </div>

            </div>

        </aside>
    );
}

    return (
    <aside className="flex h-full w-full min-w-0 flex-col bg-[#111111] text-white">

        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">

            <h2 className="text-sm font-semibold">
                AI Agents
            </h2>

            <Button
                variant="ghost"
                size="icon"
                className="size-8 text-white/60 hover:bg-white/10 hover:text-white"
            >
                <Plus className="size-4" />
            </Button>

        </div>

        <div className="flex-1 px-2 py-3">

            <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
                My Agents
            </p>

            <button
                type="button"
                className="group flex w-full items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-left text-xs text-white transition-all duration-200 hover:bg-white/15"
            >
                <img
                    src={relayAiLogo}
                    alt=""
                    className="size-5 rounded-md object-contain transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]"
                />

                <span className="font-medium">
                    RelayAI
                </span>

                <span className="ml-auto size-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.9)]" />
            </button>

        </div>

    </aside>
);
};