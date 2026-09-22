import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { LANDING_CONFIG } from "./landing.data";

export const CTA = () => {
    const navigate = useNavigate();
    const { cta } = LANDING_CONFIG;

    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />

            <div className="mx-auto max-w-4xl px-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
                    {cta.title}
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {cta.description}
                </p>

                <Button
                    size="lg"
                    className="group mt-9 gap-2 px-7"
                    onClick={() => navigate(cta.buttonRoute)}
                >
                    {cta.buttonLabel}

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </section>
    );
};