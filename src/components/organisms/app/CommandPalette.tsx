import { Bot, Folder, ListTodo, Search, Sparkles, X } from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import React, { useEffect,useState } from "react";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                isOpen ? onClose() : null;
            }
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#1b1c21] shadow-2xl"
                >
                    {/* Search Input Bar */}
                    <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3 bg-[#22232a]">
                        <Search size={16} className="text-[#7b68ee]" />
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type a command or search tasks, spaces, agents..."
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                        <button onClick={onClose} className="text-zinc-400 hover:text-white">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Quick Filter Badges */}
                    <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2 bg-[#18191e]">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Filter:</span>
                        <button className="rounded-md bg-[#7b68ee]/20 px-2 py-0.5 text-[10px] font-bold text-[#b4a7f5] border border-[#7b68ee]/30">
                            All
                        </button>
                        <button className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 hover:text-white">
                            Tasks
                        </button>
                        <button className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 hover:text-white">
                            Spaces
                        </button>
                        <button className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 hover:text-white">
                            AI Agents
                        </button>
                    </div>

                    {/* Dynamic Suggestions List */}
                    <div className="p-2 space-y-1 max-h-[320px] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-[#7b68ee]/15 hover:text-white cursor-pointer group">
                            <Sparkles size={14} className="text-[#ff007a]" />
                            <span>Ask RelayAI: "Summarize active tasks due this week"</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white cursor-pointer">
                            <ListTodo size={14} className="text-[#32a0f8]" />
                            <span>Frontend Sprint — ClickUp Theme Integration</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white cursor-pointer">
                            <Folder size={14} className="text-amber-400" />
                            <span>Engineering Space / Architecture Docs</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white cursor-pointer">
                            <Bot size={14} className="text-[#00c875]" />
                            <span>Agent — Deployment Automation Bot</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};