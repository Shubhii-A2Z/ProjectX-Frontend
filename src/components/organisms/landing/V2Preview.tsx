import {
  Bot,
  Brain,
  Sparkles,
} from "lucide-react";

export const V2Preview = () => {
  return (
    <section className="border-t bg-muted/20">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">

        <div className="relative overflow-hidden rounded-3xl border bg-background p-8 shadow-sm md:p-14">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-primary">
              Coming in V2
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Relay is just getting started.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              We're building the next generation of Relay with
              intelligent tools designed to work alongside your team's
              workspace.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">

              <div className="rounded-xl border bg-muted/30 p-5">

                <Brain className="mx-auto h-5 w-5 text-primary" />

                <p className="mt-3 text-sm font-semibold">
                  RelayAI
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Intelligence inside Relay
                </p>

              </div>

              <div className="rounded-xl border bg-muted/30 p-5">

                <Bot className="mx-auto h-5 w-5 text-primary" />

                <p className="mt-3 text-sm font-semibold">
                  Agents
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  AI built around your work
                </p>

              </div>

              <div className="rounded-xl border bg-muted/30 p-5">

                <Sparkles className="mx-auto h-5 w-5 text-primary" />

                <p className="mt-3 text-sm font-semibold">
                  More to come
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  The Relay roadmap continues
                </p>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};