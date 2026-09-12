import {
    Check,
    Copy,
    MoreHorizontal,
    RefreshCcw,
    ThumbsDown,
    ThumbsUp} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface MessageActionsProps {
    content: string;
    onRegenerate?: () => void;
}

export const MessageActions = ({
    content,
    onRegenerate
}: MessageActionsProps) => {

    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <div className="mt-3 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">

            {/* Like */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setFeedback("like")}
                className="size-7 rounded-lg text-white/35 hover:bg-white/5 hover:text-white"
            >
                <ThumbsUp
                    className={
                        feedback === "like"
                            ? "size-3.5 fill-current text-emerald-400"
                            : "size-3.5"
                    }
                />
            </Button>

            {/* Dislike */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setFeedback("dislike")}
                className="size-7 rounded-lg text-white/35 hover:bg-white/5 hover:text-white"
            >
                <ThumbsDown
                    className={
                        feedback === "dislike"
                            ? "size-3.5 fill-current text-red-400"
                            : "size-3.5"
                    }
                />
            </Button>

            {/* Copy */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="size-7 rounded-lg text-white/35 hover:bg-white/5 hover:text-white"
            >
                {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                ) : (
                    <Copy className="size-3.5" />
                )}
            </Button>

            {/* Regenerate */}
            {onRegenerate && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRegenerate}
                    className="size-7 rounded-lg text-white/35 hover:bg-white/5 hover:text-white"
                >
                    <RefreshCcw className="size-3.5" />
                </Button>
            )}

            {/* More */}
            <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-lg text-white/35 hover:bg-white/5 hover:text-white"
            >
                <MoreHorizontal className="size-3.5" />
            </Button>

        </div>
    );
};