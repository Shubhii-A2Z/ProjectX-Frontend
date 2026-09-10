import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const PricingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-28">

      <div
        className="
          relative mx-auto max-w-5xl overflow-hidden
          rounded-3xl border
          bg-muted/30
          p-10 text-center
          md:p-16
        "
      >

        <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />

        <Sparkles className="relative mx-auto mb-6 h-8 w-8 text-violet-500" />

        <h2 className="relative text-3xl font-bold md:text-4xl">
          Ready to build better with Relay?
        </h2>

        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          Start with Relay Basic and discover what your team can
          accomplish together.
        </p>

        <div className="relative mt-8">

          <Button
            size="lg"
            onClick={() => navigate("/auth/signup")}
          >
            Get started

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

        </div>

      </div>

    </section>
  );
};