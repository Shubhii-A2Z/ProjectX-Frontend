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
        <aside className="h-full w-full overflow-hidden bg-[#111111]" />
    );
};