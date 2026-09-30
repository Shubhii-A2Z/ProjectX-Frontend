import {
    CalendarDays,
    CheckCircle2,
    // Circle,
    // Clock3,
    FileText,
    MessageSquare,
    // MoreHorizontal,
    Plus,
    Sparkles,
    Users,
} from "lucide-react";

export const HOME_GREETING = {
    title: "Good evening, Shubhii",
    subtitle: "Here's what's happening across your workspace.",
} as const;

export const HOME_QUICK_ACTIONS = [
    {
        id: "task",
        label: "New task",
        icon: Plus,
        shortcut: "C",
    },
    {
        id: "message",
        label: "Message",
        icon: MessageSquare,
        shortcut: "M",
    },
    {
        id: "doc",
        label: "Create doc",
        icon: FileText,
        shortcut: "D",
    },
] as const;

export const HOME_STATS = [
    {
        id: "tasks",
        label: "My tasks",
        value: "18",
        change: "+4",
        description: "this week",
        icon: CheckCircle2,
    },
    {
        id: "messages",
        label: "Messages",
        value: "42",
        change: "+12",
        description: "unread",
        icon: MessageSquare,
    },
    {
        id: "meetings",
        label: "Meetings",
        value: "3",
        change: "Today",
        description: "scheduled",
        icon: CalendarDays,
    },
    {
        id: "activity",
        label: "Activity",
        value: "27",
        change: "Live",
        description: "updates",
        icon: Sparkles,
    },
] as const;

export const MY_WORK = [
    {
        id: "relay-home",
        title: "Finish Relay homepage",
        project: "Relay",
        priority: "High",
        due: "Today",
        status: "In progress",
        statusType: "progress",
    },
    {
        id: "sidebar",
        title: "Polish navigation system",
        project: "Relay",
        priority: "Medium",
        due: "Tomorrow",
        status: "In progress",
        statusType: "progress",
    },
    {
        id: "ai",
        title: "Design RelayAI workspace",
        project: "RelayAI",
        priority: "High",
        due: "Oct 3",
        status: "Todo",
        statusType: "todo",
    },
    {
        id: "docs",
        title: "Write product documentation",
        project: "Relay",
        priority: "Low",
        due: "Oct 5",
        status: "Todo",
        statusType: "todo",
    },
] as const;

export const RECENT_ACTIVITY = [
    {
        id: "activity-1",
        user: "Alex Morgan",
        action: "commented on",
        target: "Relay homepage",
        time: "8 min ago",
        icon: MessageSquare,
    },
    {
        id: "activity-2",
        user: "Maya Patel",
        action: "completed",
        target: "Design system",
        time: "24 min ago",
        icon: CheckCircle2,
    },
    {
        id: "activity-3",
        user: "You",
        action: "created",
        target: "RelayAI workspace",
        time: "1 hr ago",
        icon: Sparkles,
    },
    {
        id: "activity-4",
        user: "Sam Wilson",
        action: "joined",
        target: "Relay",
        time: "2 hrs ago",
        icon: Users,
    },
] as const;

export const UPCOMING = [
    {
        id: "calendar-1",
        title: "Relay product review",
        time: "10:30 AM",
        duration: "45 min",
        type: "Meeting",
    },
    {
        id: "calendar-2",
        title: "Design sync",
        time: "1:00 PM",
        duration: "30 min",
        type: "Meeting",
    },
    {
        id: "calendar-3",
        title: "Ship homepage",
        time: "4:30 PM",
        duration: "1 hr",
        type: "Focus",
    },
] as const;