import { Sparkles } from "lucide-react";

export const PricingHero = () => {
  return (
    <section className="px-6 pb-10 pt-24 text-center">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm">
          <Sparkles className="h-4 w-4 text-violet-500" />

          <span>Simple, transparent pricing</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          One workspace.
          <br />

          <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            Unlimited possibilities.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Bring your conversations, documents, teams and AI together
          with Relay.
        </p>

      </div>
    </section>
  );
};