
import {
    Check,
    ChevronsUpDown,
    Layers3,
    LoaderCircle,
    Plus,
    Sparkles,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import relayLogo from "@/assets/sidebar/relay-logo.png";
import workspaceIcon from "@/assets/sidebar/workspace-icon.png";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchWorkspaces } from "@/hooks/apis/workspaces/useFetchWorkspaces";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const WorkspaceSwitcher = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { workspaces, isLoading } = useFetchWorkspaces();

    const { setOpenCreateWorkspaceModal } =
        useCreateWorkspaceModal();

    const pathSegments = location.pathname
        .split("/")
        .filter(Boolean);

    const workspaceIndex = pathSegments.indexOf("workspaces");

    const currentWorkspaceId =
        workspaceIndex >= 0
            ? pathSegments[workspaceIndex + 1]
            : undefined;

    const activeWorkspace = workspaces.find((workspace) => {
        const workspaceId = workspace._id ?? workspace.id;

        return (
            workspaceId !== undefined &&
            workspaceId !== null &&
            String(workspaceId) === currentWorkspaceId
        );
    });

    const handleWorkspaceSwitch = (workspaceId: string): void => {
        navigate(`/workspaces/${workspaceId}`);
    };

    const handleCreateWorkspace = (): void => {
        setOpenCreateWorkspaceModal(true);
    };

    const handleGoToRelay = (): void => {
        navigate("/app/chat");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    aria-label="Switch workspace"
                    className="group relative h-auto w-full overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.025] px-3 py-3 text-left text-white shadow-[0_4px_18px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(103,232,249,0.05)]"
                >
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.04] via-transparent to-violet-400/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex min-w-0 flex-1 items-center gap-3">
                        {/* Workspace PNG */}
                        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-indigo-500/20 to-violet-500/30 shadow-[0_0_18px_rgba(139,92,246,0.12)]">
                            {isLoading ? (
                                <LoaderCircle
                                    aria-label="Loading workspaces"
                                    className="size-4 animate-spin text-cyan-200"
                                />
                            ) : (
                                <img
                                    src={workspaceIcon}
                                    alt=""
                                    draggable={false}
                                    className="size-12 object-contain"
                                />
                            )}
                        </div>

                        {/* Workspace name */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                                Current workspace
                            </p>

                            <p className="mt-1 truncate text-xs font-semibold text-white">
                                {activeWorkspace?.name ??
                                    (isLoading
                                        ? "Loading workspace..."
                                        : "Your workspace")}
                            </p>
                        </div>

                        <ChevronsUpDown className="relative size-4 shrink-0 text-white/35 transition-all duration-200 group-hover:text-cyan-200" />
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                side="bottom"
                sideOffset={8}
                className="w-[280px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101119] p-2 text-white shadow-[0_20px_70px_rgba(0,0,0,0.55)]"
            >
                {/* Dropdown header */}
                <div className="flex items-center gap-3 px-3 py-3">
                    <div className="flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                        <Layers3 className="size-4 text-cyan-200" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white">
                            Switch workspace
                        </p>

                        <p className="mt-0.5 text-[10px] text-white/40">
                            Choose your workspace
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator className="my-1 bg-white/[0.08]" />

                {/* Workspace list */}
                <div className="px-2 pb-2 pt-2">
                    <p className="px-2 pb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                        Your workspaces
                    </p>

                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2 py-6 text-xs text-white/45">
                            <LoaderCircle className="size-4 animate-spin text-cyan-300" />
                            <span>Loading workspaces...</span>
                        </div>
                    ) : workspaces.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 px-3 py-6 text-center">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.04]">
                                <Layers3 className="size-5 text-white/30" />
                            </div>

                            <p className="text-xs font-medium text-white/70">
                                No workspaces yet
                            </p>

                            <p className="max-w-[190px] text-[10px] leading-relaxed text-white/35">
                                Create a workspace to bring your team together.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {workspaces.map((workspace) => {
                                const rawWorkspaceId =
                                    workspace._id ?? workspace.id;

                                if (
                                    rawWorkspaceId === undefined ||
                                    rawWorkspaceId === null
                                ) {
                                    return null;
                                }

                                const workspaceId =
                                    String(rawWorkspaceId);

                                const isActive =
                                    workspaceId === currentWorkspaceId;

                                return (
                                    <DropdownMenuItem
                                        key={workspaceId}
                                        onClick={() =>
                                            handleWorkspaceSwitch(
                                                workspaceId
                                            )
                                        }
                                        className={[
                                            "group/item flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-2.5 py-2.5 transition-all duration-200",
                                            "focus:bg-white/[0.07] focus:text-white",
                                            isActive
                                                ? "border-cyan-300/[0.12] bg-cyan-300/[0.06]"
                                                : "hover:border-white/[0.06] hover:bg-white/[0.04]",
                                        ].join(" ")}
                                    >
                                        {/* Workspace PNG */}
                                        <div
                                            className={[
                                                "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-colors",
                                                isActive
                                                    ? "border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-violet-500/20"
                                                    : "border-white/[0.06] bg-white/[0.04]",
                                            ].join(" ")}
                                        >
                                            <img
                                                src={workspaceIcon}
                                                alt=""
                                                draggable={false}
                                                className="size-10 object-contain"
                                            />
                                        </div>

                                        {/* Workspace details */}
                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={[
                                                    "truncate text-xs font-medium",
                                                    isActive
                                                        ? "text-white"
                                                        : "text-white/70",
                                                ].join(" ")}
                                            >
                                                {workspace.name}
                                            </p>

                                            {isActive && (
                                                <p className="mt-0.5 text-[9px] font-medium text-cyan-300/80">
                                                    Current workspace
                                                </p>
                                            )}
                                        </div>

                                        {isActive && (
                                            <Check className="size-4 shrink-0 text-cyan-300" />
                                        )}
                                    </DropdownMenuItem>
                                );
                            })}
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator className="my-1 bg-white/[0.08]" />

                {/* Create workspace */}
                <DropdownMenuItem
                    onClick={handleCreateWorkspace}
                    className="group/item flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-3 text-white/70 transition-colors focus:bg-white/[0.07] focus:text-white"
                >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.07] transition-colors group-hover/item:bg-cyan-300/[0.12]">
                        <Plus className="size-4 text-cyan-300" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">
                            Create a workspace
                        </p>

                        <p className="mt-0.5 text-[10px] text-white/35">
                            Start a new team space
                        </p>
                    </div>
                </DropdownMenuItem>

                {/* Return to Relay */}
                <DropdownMenuItem
                    onClick={handleGoToRelay}
                    className="group/item flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-3 text-white/70 transition-colors focus:bg-white/[0.07] focus:text-white"
                >
                    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-300/10 bg-violet-300/[0.07] transition-colors group-hover/item:bg-violet-300/[0.12]">
                        <img
                            src={relayLogo}
                            alt=""
                            draggable={false}
                            className="size-10 object-contain"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">
                            Go to Relay
                        </p>

                        <p className="mt-0.5 text-[10px] text-white/35">
                            Open your conversations
                        </p>
                    </div>

                    <Sparkles className="size-3.5 text-violet-300/60" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};