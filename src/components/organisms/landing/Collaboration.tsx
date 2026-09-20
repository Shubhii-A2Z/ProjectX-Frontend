import {
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

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
      className="border-t bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Visual */}
          <div className="relative">

            <div className="absolute -inset-5 rounded-3xl bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">

              {/* Channel header */}
              <div className="flex items-center justify-between border-b px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageCircle className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      # project-alpha
                    </p>

                    <p className="text-xs text-muted-foreground">
                      12 members
                    </p>
                  </div>

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

              {/* Messages */}
              <div className="space-y-6 p-6">

                <div className="flex gap-3">

                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10" />

                  <div>
                    <div className="text-sm font-medium">
                      Alex
                    </div>

                    <div className="mt-1 rounded-xl bg-muted px-4 py-3 text-sm">
                      The new API is ready for review.
                    </div>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      10:42 AM
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10" />

                  <div>
                    <div className="text-sm font-medium">
                      Sarah
                    </div>

                    <div className="mt-1 rounded-xl bg-muted px-4 py-3 text-sm">
                      Nice! I'll take a look at it.
                    </div>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      10:44 AM
                    </p>
                  </div>

                </div>

              </div>

              {/* Input */}
              <div className="border-t p-5">

                <div className="rounded-xl border bg-background px-4 py-3 text-sm text-muted-foreground">
                  Message #project-alpha...
                </div>

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
              Relay gives every conversation a place. Keep your
              team aligned without scattering important context
              across different tools.
            </p>

            <div className="mt-8 space-y-4">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

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