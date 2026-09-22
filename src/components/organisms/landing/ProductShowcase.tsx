import {
    ArrowUpRight,
    Hash,
    MessageCircle,
    Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { LANDING_CONFIG } from "./landing.data";

export const ProductShowcase = () => {
    const { productShowcase } = LANDING_CONFIG;

    return (
        <section
            id="product-showcase"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        {productShowcase.eyebrow}
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        {productShowcase.title}
                    </h2>

                    <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
                        {productShowcase.description}
                    </p>
                </div>

                {/* Product window */}
                <div className="relative mx-auto mt-16 max-w-6xl">
                    <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />

                    <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/90 shadow-2xl backdrop-blur-xl">
                        {/* Browser header */}
                        <div className="flex h-12 items-center gap-4 border-b bg-muted/40 px-4">
                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                            </div>

                            <div className="mx-auto hidden h-7 max-w-md flex-1 items-center justify-center rounded-md border bg-background/70 text-xs text-muted-foreground sm:flex">
                                {productShowcase.browserUrl}
                            </div>

                            <div className="w-12" />
                        </div>

                        {/* Application */}
                        <div className="grid min-h-[480px] md:grid-cols-[210px_1fr]">
                            {/* Sidebar */}
                            <aside className="hidden border-r bg-muted/20 p-4 md:block">
                                <div className="mb-7 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                                        {productShowcase.logoInitial}
                                    </div>

                                    <span className="font-semibold">
                                        {productShowcase.workspaceName}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {productShowcase.navigation.map((item) => (
                                        <div
                                            key={item.label}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                                                item.active
                                                    ? "bg-primary/10 font-medium text-primary"
                                                    : "text-muted-foreground"
                                            }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </aside>

                            {/* Main */}
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {productShowcase.greeting}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                                            {productShowcase.heading}
                                        </h3>
                                    </div>

                                    <div className="hidden rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground sm:block">
                                        {productShowcase.workspaceLabel}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-8 grid grid-cols-3 gap-3">
                                    {productShowcase.stats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="rounded-xl border bg-background/70 p-4"
                                        >
                                            <div className="text-2xl font-semibold">
                                                {stat.value}
                                            </div>

                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Conversations */}
                                <div className="mt-6 rounded-xl border bg-background/60">
                                    <div className="flex items-center justify-between border-b px-4 py-3">
                                        <div className="text-sm font-medium">
                                            {productShowcase.conversationsTitle}
                                        </div>

                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                    </div>

                                    <div className="divide-y">
                                        {productShowcase.conversations.map(
                                            (conversation) => (
                                                <div
                                                    key={conversation.title}
                                                    className="flex items-center gap-4 px-4 py-4"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                        {conversation.type ===
                                                        "channel" ? (
                                                            <Hash className="h-4 w-4" />
                                                        ) : (
                                                            <MessageCircle className="h-4 w-4" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium">
                                                            {
                                                                conversation.title
                                                            }
                                                        </p>

                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {
                                                                conversation.preview
                                                            }
                                                        </p>
                                                    </div>

                                                    <span className="hidden text-xs text-muted-foreground sm:block">
                                                        {conversation.time}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom message */}
                <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 shrink-0 text-primary" />
                    {productShowcase.bottomMessage}
                </div>
            </div>
        </section>
    );
};