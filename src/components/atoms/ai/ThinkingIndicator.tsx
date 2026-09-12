import { Sparkles } from "lucide-react";

export const ThinkingIndicator = () => {
    return (
        <div className="flex items-center gap-2 py-2 text-xs text-white/45">

            <div className="relative flex size-5 items-center justify-center">

                <Sparkles className="size-3.5 animate-pulse text-purple-300" />

            </div>

            <span>
                Thinking...
            </span>

        </div>
    );
};