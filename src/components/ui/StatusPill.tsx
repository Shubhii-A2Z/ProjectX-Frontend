import React from "react";

type StatusType = "TO DO" | "IN PROGRESS" | "COMPLETE" | "HIGH PRIORITY" | "BLOCKED";

const statusStyles: Record<StatusType, string> = {
    "TO DO": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    "IN PROGRESS": "bg-[#32a0f8]/15 text-[#32a0f8] border-[#32a0f8]/30",
    "COMPLETE": "bg-[#00c875]/15 text-[#00c875] border-[#00c875]/30",
    "HIGH PRIORITY": "bg-[#ff007a]/15 text-[#ff007a] border-[#ff007a]/30",
    "BLOCKED": "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export const StatusPill: React.FC<{ status: StatusType }> = ({ status }) => {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${statusStyles[status]}`}>
            <span className="size-1.5 rounded-full bg-current" />
            {status}
        </span>
    );
};