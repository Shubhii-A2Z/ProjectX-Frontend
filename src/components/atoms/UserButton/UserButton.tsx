
import {
    Building2,
    ChevronUp,
    LogOut,
    Settings,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const UserButton = () => {
    const navigate = useNavigate();

    const { auth, logout } = useAuth();
    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    const user = auth?.user;

    const username = user?.username ?? "Relay User";
    const email = user?.email ?? "";

    const initials = username
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/auth/signin");
        } catch (error) {
            console.error("Unable to sign out:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label="Open profile menu"
                    className="group relative flex size-10 items-center justify-center rounded-full outline-none transition hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-violet-400/60"
                >
                    <Avatar className="size-9 border border-white/10 transition duration-200 group-hover:border-violet-300/40 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.2)]">
                        <AvatarImage
                            src={user?.avatar ?? undefined}
                            alt={username}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-600 text-xs font-bold text-white">
                            {initials || "R"}
                        </AvatarFallback>
                    </Avatar>

                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#101010] bg-emerald-400" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={12}
                className="w-64 border-white/10 bg-[#171717] p-2 text-white"
            >
                <DropdownMenuLabel className="px-2 py-3 font-normal">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                            <AvatarImage
                                src={user?.avatar ?? undefined}
                                alt={username}
                            />
                            <AvatarFallback className="bg-violet-500/20 text-xs font-semibold text-violet-200">
                                {initials || "R"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                                {username}
                            </p>
                            <p className="truncate text-xs text-white/40">
                                {email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    onClick={() => setOpenCreateWorkspaceModal(true)}
                    className="cursor-pointer gap-3 rounded-lg py-2.5 focus:bg-white/[0.08] focus:text-white"
                >
                    <Building2 className="size-4 text-violet-300" />
                    <span className="text-xs">Create workspace</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => navigate("/app/settings")}
                    className="cursor-pointer gap-3 rounded-lg py-2.5 focus:bg-white/[0.08] focus:text-white"
                >
                    <Settings className="size-4 text-white/50" />
                    <span className="text-xs">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => navigate("/app/settings")}
                    className="cursor-pointer gap-3 rounded-lg py-2.5 focus:bg-white/[0.08] focus:text-white"
                >
                    <UserRound className="size-4 text-white/50" />
                    <span className="text-xs">Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer gap-3 rounded-lg py-2.5 text-red-300 focus:bg-red-400/10 focus:text-red-200"
                >
                    <LogOut className="size-4" />
                    <span className="text-xs">Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};