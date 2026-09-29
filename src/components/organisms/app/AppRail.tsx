import { NavLink } from "react-router-dom";

import relayLogo from "@/assets/sidebar/relay-logo.png";
import { UserButton } from "@/components/atoms/UserButton/UserButton";
import {
    APP_NAVIGATION,
    APP_SETTINGS_NAVIGATION,
    RELAY_BRAND,
} from "@/config/appNavigation";
import { cn } from "@/lib/utils";

const railLinkClass = (isActive: boolean): string =>
    cn(
        "group relative flex w-[58px] flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-[10px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
        isActive
            ? "bg-white/[0.095] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
            : "text-white/45 hover:bg-white/[0.055] hover:text-white/90"
    );

export const AppRail = () => {
    return (
        <aside className="relative flex h-full w-[72px] shrink-0 flex-col items-center border-r border-white/[0.07] bg-[#090A10] px-2 py-4 text-white">

            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.13),transparent_70%)]" />

            {/* Relay logo */}
            <NavLink
                aria-label={`${RELAY_BRAND.name} home`}
                title={RELAY_BRAND.name}
                to="/app/chat"
                className="group relative mb-8 flex size-12 items-center justify-center rounded-[17px] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-[1.04] hover:border-cyan-300/40 hover:shadow-[0_0_24px_rgba(103,232,249,0.14),0_0_34px_rgba(167,139,250,0.12)]"
            >
                <img
                    src={relayLogo}
                    alt="Relay"
                    draggable={false}
                    className="size-9 object-contain transition-transform duration-500 group-hover:rotate-[8deg]"
                />

                <span className="pointer-events-none absolute -inset-px -z-10 rounded-[18px] bg-gradient-to-br from-cyan-400/25 via-violet-500/15 to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            </NavLink>

            {/* Main navigation */}
            <nav
                aria-label="Main navigation"
                className="relative flex w-full flex-1 flex-col items-center gap-2"
            >
                {APP_NAVIGATION.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.description}
                        aria-label={item.label}
                        className={({ isActive }) =>
                            railLinkClass(isActive)
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute -left-[9px] top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan-300 to-violet-400 shadow-[0_0_12px_rgba(103,232,249,0.65)]" />
                                )}

                                <img
                                    src={item.iconSrc}
                                    alt=""
                                    draggable={false}
                                    className={cn(
                                        "size-[30px] object-contain transition-all duration-200",
                                        isActive
                                            ? "drop-shadow-[0_0_8px_rgba(103,232,249,0.35)]"
                                            : "opacity-65 group-hover:scale-105 group-hover:opacity-100"
                                    )}
                                />

                                <span className="max-w-full truncate">
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Settings */}
            <NavLink
                to={APP_SETTINGS_NAVIGATION.path}
                title={APP_SETTINGS_NAVIGATION.description}
                aria-label={APP_SETTINGS_NAVIGATION.label}
                className={({ isActive }) =>
                    `${railLinkClass(isActive)} mt-3`
                }
            >
                {({ isActive }) => (
                    <>
                        {isActive && (
                            <span className="absolute -left-[9px] top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan-300 to-violet-400 shadow-[0_0_12px_rgba(103,232,249,0.65)]" />
                        )}

                        <img
                            src={APP_SETTINGS_NAVIGATION.iconSrc}
                            alt=""
                            draggable={false}
                            className={cn(
                                "size-[30px] object-contain transition-all duration-200",
                                isActive
                                    ? "drop-shadow-[0_0_8px_rgba(103,232,249,0.35)]"
                                    : "opacity-65 group-hover:scale-105 group-hover:opacity-100"
                            )}
                        />

                        <span>{APP_SETTINGS_NAVIGATION.label}</span>
                    </>
                )}
            </NavLink>

            {/* User profile */}
            <div className="mt-4 flex w-full justify-center border-t border-white/[0.07] pt-4">
                <UserButton />
            </div>
        </aside>
    );
};