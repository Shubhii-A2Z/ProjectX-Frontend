import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">

        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-xl md:px-16">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)] opacity-10" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <span className="font-bold">
                R
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Bring your team together.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Create your workspace and start collaborating
              with your team using Relay.
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="mt-8 h-12 px-7"
              onClick={() => navigate("/auth/signup")}
            >
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
};