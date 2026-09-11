import { Outlet } from "react-router-dom";

import { AppRail } from "./AppRail";
import { AppSidebar } from "./AppSidebar";

export const AppShell = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Left navigation rail */}
            <AppRail />

            {/* Contextual sidebar */}
            <AppSidebar />

            {/* Main content */}
            <main className="min-w-0 flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};