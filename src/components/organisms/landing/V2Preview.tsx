import {
    ArrowRight,
    Brain,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { LANDING_CONFIG } from "./landing.data";

export const V2Preview = () => {
    const { v2Preview } = LANDING_CONFIG;

    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            <div className="absolute inset-x-0 top-1/2 -z-10 h-[500px] -translate-y-1/2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

            <div className="mx-auto max-w-6xl px-6">
                <Card className="relative overflow-hidden rounded-3xl border-primary/20 bg-card/80 shadow-2xl backdrop-blur-xl">
                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                                <Sparkles className="h-3.5 w-3.5" />
                                {v2Preview.badge}
                            </div>

                            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
                                {v2Preview.title}
                            </h2>

                            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                                {v2Preview.description}
                            </p>

                            <Button className="mt-8 gap-2">
                                {v2Preview.buttonLabel}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="relative mx-auto w-full max-w-sm">
                            <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl" />

                            <div className="relative rounded-3xl border bg-background/90 p-6 shadow-xl">
                                <div className="flex items-center gap-3 border-b pb-5">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Brain className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            {v2Preview.agent.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {v2Preview.agent.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {v2Preview.agent.steps.map((step) => (
                                        <div
                                            key={step}
                                            className="rounded-lg border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground"
                                        >
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};