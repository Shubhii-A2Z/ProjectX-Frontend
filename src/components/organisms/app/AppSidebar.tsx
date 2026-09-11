import { useLocation } from "react-router-dom";

import { AgentSidebar } from "@/components/organisms/agents/AgentSidebar";
import { ChatSidebar } from "@/components/organisms/chat/ChatSidebar";

export const AppSidebar = () => {
    const location = useLocation();

    if (location.pathname.startsWith("/app/agents")) {
        return <AgentSidebar />;
    }

    if (location.pathname.startsWith("/app/chat")) {
        return <ChatSidebar />;
    }

    return (
        <aside className="w-[240px] shrink-0 border-r bg-background" />
    );
};