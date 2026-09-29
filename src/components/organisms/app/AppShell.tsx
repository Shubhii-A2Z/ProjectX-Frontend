import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { AppRail } from "@/components/organisms/app/AppRail";
import { AppSidebar } from "@/components/organisms/app/AppSidebar";

const APP_RAIL_WIDTH = 72;
const MIN_SIDEBAR_WIDTH = 220;
const MAX_SIDEBAR_WIDTH = 420;
const DEFAULT_SIDEBAR_WIDTH = 260;

export const AppShell = () => {
    const [sidebarWidth, setSidebarWidth] = useState(
        DEFAULT_SIDEBAR_WIDTH
    );

    const isResizing = useRef(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent): void => {
            if (!isResizing.current) {
                return;
            }

            const requestedWidth =
                event.clientX - APP_RAIL_WIDTH;

            const clampedWidth = Math.min(
                Math.max(
                    requestedWidth,
                    MIN_SIDEBAR_WIDTH
                ),
                MAX_SIDEBAR_WIDTH
            );

            setSidebarWidth(clampedWidth);
        };

        const handleMouseUp = (): void => {
            isResizing.current = false;

            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "mouseup",
            handleMouseUp
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "mouseup",
                handleMouseUp
            );

            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, []);

    const startResizing = (): void => {
        isResizing.current = true;

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#090A10] text-white">
            {/* Fixed application rail */}
            <div
                className="h-full shrink-0"
                style={{
                    width: `${APP_RAIL_WIDTH}px`,
                }}
            >
                <AppRail />
            </div>

            {/* Resizable workspace sidebar */}
            <div
                style={{
                    width: `${sidebarWidth}px`,
                }}
                className="relative h-full shrink-0"
            >
                <AppSidebar />

                {/* Sidebar resize handle */}
                <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label="Resize sidebar"
                    aria-valuenow={sidebarWidth}
                    aria-valuemin={MIN_SIDEBAR_WIDTH}
                    aria-valuemax={MAX_SIDEBAR_WIDTH}
                    tabIndex={0}
                    onMouseDown={startResizing}
                    onKeyDown={(event) => {
                        if (event.key === "ArrowLeft") {
                            setSidebarWidth((width) =>
                                Math.max(
                                    MIN_SIDEBAR_WIDTH,
                                    width - 10
                                )
                            );
                        }

                        if (event.key === "ArrowRight") {
                            setSidebarWidth((width) =>
                                Math.min(
                                    MAX_SIDEBAR_WIDTH,
                                    width + 10
                                )
                            );
                        }
                    }}
                    className="group absolute right-0 top-0 z-50 h-full w-[6px] cursor-col-resize outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300/70"
                >
                    {/* Permanent divider */}
                    <div className="absolute right-0 top-0 h-full w-px bg-white/10" />

                    {/* Hover glow */}
                    <div className="absolute right-[-1px] top-0 h-full w-[3px] bg-transparent transition-all duration-200 group-hover:bg-cyan-400/60 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.45)] group-focus-visible:bg-cyan-400/60" />
                </div>
            </div>

            {/* Main page content */}
            <main className="min-w-0 flex-1 overflow-hidden bg-[#090A10]">
                <Outlet />
            </main>
        </div>
    );
};