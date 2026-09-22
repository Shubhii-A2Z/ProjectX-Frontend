import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import { AVAILABLE_MODELS } from "./models";

interface ChatModelSelectorProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
}

export const ChatModelSelector = ({
    selectedModel,
    onModelChange,
}: ChatModelSelectorProps) => {
    const [open, setOpen] = useState(false);

    const selected =
        AVAILABLE_MODELS.find((model) => model.id === selectedModel) ??
        AVAILABLE_MODELS[0];

    const Icon = selected.icon;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
            >
                <Icon className="h-3.5 w-3.5" />

                <span>{selected.shortName}</span>

                <ChevronDown
                    className={`h-3 w-3 text-zinc-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <>
                    <button
                        type="button"
                        aria-label="Close model selector"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute bottom-full right-0 z-50 mb-2 w-64 overflow-hidden rounded-xl border border-white/[0.08] bg-[#171717] p-1.5 shadow-2xl shadow-black/50">
                        {AVAILABLE_MODELS.map((model) => {
                            const ModelIcon = model.icon;
                            const active = model.id === selectedModel;

                            return (
                                <button
                                    key={model.id}
                                    type="button"
                                    onClick={() => {
                                        onModelChange(model.id);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                                        active
                                            ? "bg-white/[0.07]"
                                            : "hover:bg-white/[0.05]"
                                    }`}
                                >
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                                        <ModelIcon className="h-3.5 w-3.5 text-zinc-300" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[12px] font-medium text-white">
                                                {model.name}
                                            </span>

                                            {model.badge && (
                                                <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-zinc-400">
                                                    {model.badge}
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-0.5 text-[10px] text-zinc-500">
                                            {model.description}
                                        </p>
                                    </div>

                                    {active && (
                                        <Check className="h-3.5 w-3.5 text-white" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};