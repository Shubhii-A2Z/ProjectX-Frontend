import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Keep conversations organized",
  "Create dedicated team channels",
  "Bring projects and people together",
  "Reduce unnecessary app switching",
];

export const Collaboration = () => {
  return (
    <section
      id="collaboration"
      className="border-t"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Visual */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />

            <div className="relative rounded-2xl border bg-card p-6 shadow-xl">

              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">
                    # project-alpha
                  </p>

                  <p className="text-xs text-muted-foreground">
                    12 members
                  </p>
                </div>

                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6 py-6">

                <div className="flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/20" />

                  <div>
                    <div className="text-sm font-medium">
                      Alex
                    </div>

                    <div className="mt-1 rounded-lg bg-muted px-4 py-2 text-sm">
                      The new API is ready for review.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/20" />

                  <div>
                    <div className="text-sm font-medium">
                      Sarah
                    </div>

                    <div className="mt-1 rounded-lg bg-muted px-4 py-2 text-sm">
                      Nice! I'll take a look at it.
                    </div>
                  </div>
                </div>

              </div>

              <div className="rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground">
                Message #project-alpha...
              </div>

            </div>
          </div>

          {/* Content */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Collaboration
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your team's conversations,
              <span className="text-primary">
                {" "}connected.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Stop jumping between different tools just to figure out
              what's happening. Relay keeps your team connected and
              your conversations organized.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />

                  <span className="text-sm font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};