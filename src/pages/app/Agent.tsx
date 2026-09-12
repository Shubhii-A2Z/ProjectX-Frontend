import { Sparkles } from "lucide-react";

import relayAiLogo from "@/assets/relay-ai-logo.png";
import { ChatView } from "@/components/organisms/ai/ChatView";
import { isProduction } from "@/utils/environment";

export const Agent = () => {

    if (isProduction) {
        return (
            <div className="flex h-full items-center justify-center bg-[#111111] text-white">

                <div className="max-w-md px-6 text-center">

                    {/* RelayAI Logo */}
                    <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-3 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                        <img
                            src={relayAiLogo}
                            alt="RelayAI"
                            className="size-full object-contain"
                        />
                    </div>

                    {/* Version badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-purple-300">
                        <Sparkles className="size-3" />
                        Relay v2
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl font-semibold tracking-tight">
                        AI Agents are coming soon.
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/45">
                        We're building something powerful for
                        Relay. AI Agents will be available in
                        Relay v2.
                    </p>

                    {/* Coming Soon */}
                    <div className="mt-7 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60">
                        Coming Soon
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 flex-col">
            <ChatView />
        </div>
    );
};