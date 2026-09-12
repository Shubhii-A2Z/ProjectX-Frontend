import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { AppRail } from "@/components/organisms/app/AppRail";
import { AppSidebar } from "@/components/organisms/app/AppSidebar";

export const AppShell = () => {
    const [sidebarWidth, setSidebarWidth] = useState(260);

    const isResizing = useRef(false);

    const startResizing = () => {
        isResizing.current = true;

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };

    const stopResizing = () => {
        isResizing.current = false;

        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    };

    const resize = (event: MouseEvent) => {
        if (!isResizing.current) {
            return;
        }

        /*
         * AppRail = 68px
         *
         * clientX gives us the mouse position from
         * the left side of the browser.
         *
         * Subtracting 68 means the sidebar width
         * starts AFTER the fixed rail.
         */
        const newWidth = event.clientX - 68;

        const MIN_WIDTH = 220;
        const MAX_WIDTH = 420;

        const clampedWidth = Math.min(
            Math.max(newWidth, MIN_WIDTH),
            MAX_WIDTH
        );

        setSidebarWidth(clampedWidth);
    };

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);

        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, []);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#0b0b0b] text-white">

            {/* =================================================
                FIXED APPLICATION RAIL
                ================================================= */}

            <div className="h-full w-[68px] shrink-0">
                <AppRail />
            </div>


            {/* =================================================
                RESIZABLE SIDEBAR
                ================================================= */}

            <div
                style={{
                    width: `${sidebarWidth}px`
                }}
                className="relative h-full shrink-0"
            >
                <AppSidebar />

                {/* Resize handle */}
                <div
                    onMouseDown={startResizing}
                    className="group absolute right-0 top-0 z-50 h-full w-[6px] cursor-col-resize"
                >
                    {/* Permanent partition */}
                    <div className="absolute right-0 top-0 h-full w-px bg-white/10" />

                    {/* Hover glow */}
                    <div className="absolute right-[-1px] top-0 h-full w-[3px] bg-transparent transition-all duration-200 group-hover:bg-cyan-400/60 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.45)]" />
                </div>
            </div>


            {/* =================================================
                MAIN CONTENT
                ================================================= */}

            <main className="min-w-0 flex-1 overflow-hidden bg-[#0b0b0b]">
                <Outlet />
            </main>

        </div>
    );
};