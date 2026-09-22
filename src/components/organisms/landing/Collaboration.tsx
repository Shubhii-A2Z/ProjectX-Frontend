import {
    ArrowRight,
    Check,
    Hash,
    MessageCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { LANDING_CONFIG } from "./landing.data";

export const Collaboration = () => {
    const { collaboration } = LANDING_CONFIG;

    return (
        <section
            id="collaboration"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left */}
                    <div>
                        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            {collaboration.eyebrow}
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                            {collaboration.title}
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                            {collaboration.description}
                        </p>

                        <div className="mt-8 space-y-4">
                            {collaboration.benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Check className="h-3.5 w-3.5" />
                                    </div>

                                    <span className="text-sm text-foreground/80">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary">
                            {collaboration.linkLabel}
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="relative">
                        <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />

                        <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/80 shadow-xl backdrop-blur">
                            <div className="flex items-center gap-3 border-b px-5 py-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Hash className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        {collaboration.channel.name}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {collaboration.channel.members}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 p-5">
                                {collaboration.channel.messages.map(
                                    (message) => (
                                        <div
                                            key={`${message.author}-${message.time}`}
                                            className="flex gap-3"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                                                {message.initial}
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold">
                                                        {message.author}
                                                    </span>

                                                    <span className="text-xs text-muted-foreground">
                                                        {message.time}
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                                    {message.content}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}

                                <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
                                    <MessageCircle className="h-4 w-4 text-muted-foreground" />

                                    <span className="text-xs text-muted-foreground">
                                        {collaboration.channel.inputPlaceholder}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};