import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";

import { LANDING_CONFIG } from "./landing.data";

export const WhyRelay = () => {
    const { whyRelay } = LANDING_CONFIG;

    return (
        <section
            id="about"
            className="relative overflow-hidden border-y bg-muted/20 py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="max-w-3xl">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        {whyRelay.eyebrow}
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        {whyRelay.title}
                    </h2>

                    <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
                        {whyRelay.description}
                    </p>
                </div>

                <div className="mt-14 grid gap-5 md:grid-cols-3">
                    {whyRelay.items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card
                                key={item.title}
                                className="group relative overflow-hidden border-border/60 bg-background/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                                </div>

                                <h3 className="mt-8 text-lg font-semibold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};