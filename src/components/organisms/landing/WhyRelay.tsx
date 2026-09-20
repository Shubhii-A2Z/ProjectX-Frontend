import {
  ArrowDown,
  ArrowRight,
  MessageCircle,
  Users,
  Zap,
} from "lucide-react";

export const WhyRelay = () => {
  return (
    <section
      id="about"
      className="border-t"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Relay
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Stop switching between tools
            <span className="text-primary">
              {" "}just to get work done.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Your team's conversations shouldn't be separated from
            the people and spaces where the work happens.
          </p>

        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">

          {/* Before */}
          <div className="rounded-2xl border bg-muted/30 p-7">

            <p className="text-sm font-semibold text-muted-foreground">
              The usual workflow
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 rounded-xl border bg-background p-4">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Chat app</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border bg-background p-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Team workspace</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border bg-background p-4">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Another tool</span>
              </div>

            </div>

          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>

          <div className="flex md:hidden items-center justify-center">
            <ArrowDown className="h-6 w-6 text-primary" />
          </div>

          {/* Relay */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.04] p-7 shadow-lg">

            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  R
                </div>

                <div>
                  <p className="font-semibold">
                    Relay
                  </p>

                  <p className="text-xs text-muted-foreground">
                    One connected workspace
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-3">

                {[
                  "Conversations",
                  "Channels",
                  "Workspaces",
                  "Your team",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border bg-background/80 p-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />

                    <span className="text-sm">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};