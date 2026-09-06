import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">

        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:px-16">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)] opacity-10" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to bring your team together?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Create your workspace and start collaborating
              with your team today.
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="mt-8 h-12 px-7"
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