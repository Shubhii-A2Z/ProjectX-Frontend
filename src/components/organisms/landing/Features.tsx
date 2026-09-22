import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";

import { LANDING_CONFIG } from "./landing.data";

export const Features = () => {
    const { features } = LANDING_CONFIG;

    return (
        <section
            id="features"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        {features.eyebrow}
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        {features.title}
                    </h2>

                    <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
                        {features.description}
                    </p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2">
                    {features.items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card
                                key={item.number}
                                className="group relative overflow-hidden border-border/60 bg-card/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="text-sm font-semibold text-primary">
                                        {item.number}
                                    </span>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>

                                <h3 className="mt-12 text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>

                                <ArrowUpRight className="absolute bottom-7 right-7 h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};