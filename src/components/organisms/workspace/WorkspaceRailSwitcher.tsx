import {
    Check,
    ChevronDown,
} from "lucide-react";
import {
    AnimatePresence,
    motion,
} from "motion/react";
import {
    useState,
} from "react";

import {
    RELAY_MOTION,
} from "@/config/design";
import {
    type Workspace,
    WORKSPACES,
} from "@/config/sidebarNavigation";

export const WorkspaceRailSwitcher = () => {
    const [open, setOpen] = useState(false);

    const [workspace, setWorkspace] =
        useState<Workspace>(WORKSPACES[0]);

    return (
        <div className="relative">
            <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={RELAY_MOTION.spring.responsive}
                onClick={() => setOpen((value) => !value)}
                className="
                    flex
                    size-12
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-white/[0.08]
                    bg-white/[0.05]
                    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                    transition-colors
                    hover:border-white/[0.13]
                    hover:bg-white/[0.08]
                "
            >
                <span className="
                    relay-brand-gradient
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-[10px]
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_0_18px_rgba(34,211,238,0.12)]
                ">
                    {workspace.icon}
                </span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <>
                        <div
                            className="
                                fixed
                                inset-0
                                z-[90]
                            "
                            onClick={() => setOpen(false)}
                        />

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.96,
                                y: -5,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.96,
                                y: -5,
                            }}
                            transition={{
                                duration:
                                    RELAY_MOTION.duration.fast,
                            }}
                            className="
                                absolute
                                left-0
                                top-[58px]
                                z-[100]
                                w-[250px]
                                overflow-hidden
                                rounded-[16px]
                                border
                                border-white/[0.09]
                                bg-[#15171d]/95
                                p-2
                                shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                                backdrop-blur-2xl
                            "
                        >
                            <div className="
                                px-2.5
                                pb-2
                                pt-1
                            ">
                                <p className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-zinc-600
                                ">
                                    Workspaces
                                </p>
                            </div>

                            <div className="space-y-1">
                                {WORKSPACES.map((item) => {
                                    const selected =
                                        item.id === workspace.id;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                                setWorkspace(item);
                                                setOpen(false);
                                            }}
                                            className={`
                                                flex
                                                w-full
                                                items-center
                                                gap-3
                                                rounded-[10px]
                                                px-2.5
                                                py-2.5
                                                text-left
                                                transition
                                                ${
                                                    selected
                                                        ? "bg-white/[0.07]"
                                                        : "hover:bg-white/[0.045]"
                                                }
                                            `}
                                        >
                                            <span className="
                                                flex
                                                size-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-[9px]
                                                bg-white/[0.07]
                                                text-xs
                                                font-semibold
                                                text-zinc-300
                                            ">
                                                {item.icon}
                                            </span>

                                            <span className="
                                                flex-1
                                                truncate
                                                text-[13px]
                                                font-medium
                                                text-zinc-200
                                            ">
                                                {item.name}
                                            </span>

                                            {selected && (
                                                <Check
                                                    size={15}
                                                    className="text-cyan-400"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="
                                mt-2
                                border-t
                                border-white/[0.06]
                                pt-2
                            ">
                                <button
                                    type="button"
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-[10px]
                                        px-2.5
                                        py-2.5
                                        text-[13px]
                                        font-medium
                                        text-zinc-500
                                        transition
                                        hover:bg-white/[0.045]
                                        hover:text-zinc-300
                                    "
                                >
                                    <span className="
                                        flex
                                        size-8
                                        items-center
                                        justify-center
                                        rounded-[9px]
                                        border
                                        border-dashed
                                        border-white/[0.12]
                                    ">
                                        +
                                    </span>

                                    Create workspace
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};