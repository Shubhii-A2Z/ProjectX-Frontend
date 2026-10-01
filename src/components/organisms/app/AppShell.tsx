import { Outlet } from "react-router-dom";

import { AppRail } from "@/components/organisms/app/AppRail";
import { AppSidebar } from "@/components/organisms/app/AppSidebar";

export const AppShell = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#07080c] text-white">
            <AppRail />

            <AppSidebar />

            <main className="min-w-0 flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};