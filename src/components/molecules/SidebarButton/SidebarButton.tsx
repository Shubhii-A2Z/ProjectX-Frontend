import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarButtonProps {
    Icon: LucideIcon;
    label: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export const SidebarButton = ({
    Icon,
    label,
    active = false,
    onClick,
    className,
}: SidebarButtonProps) => {
    return (
        <button
            type="button"
            aria-label={label}
            aria-current={active ? "page" : undefined}
            title={label}
            onClick={onClick}
            className={cn(
                "group relative flex w-[58px] flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-[10px] font-medium tracking-wide transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                active
                    ? "bg-white/[0.095] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
                    : "text-white/45 hover:bg-white/[0.055] hover:text-white/90",
                className
            )}
        >
            {active && (
                <span className="absolute -left-[9px] top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan-300 to-violet-400 shadow-[0_0_12px_rgba(103,232,249,0.65)]" />
            )}

            <Icon
                aria-hidden="true"
                className={cn(
                    "size-[21px] transition-all duration-200",
                    active
                        ? "text-cyan-200 drop-shadow-[0_0_9px_rgba(103,232,249,0.42)]"
                        : "group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.32)]"
                )}
                strokeWidth={active ? 2.2 : 1.8}
            />

            <span className="max-w-full truncate">
                {label}
            </span>
        </button>
    );
};