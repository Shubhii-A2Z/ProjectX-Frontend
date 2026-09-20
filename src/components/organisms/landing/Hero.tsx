import {
  ArrowRight,
  Hash,
  MessageCircle,
  Play,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">

        {/* Hero content */}
        <div className="mx-auto max-w-4xl text-center">

          <Badge
            variant="secondary"
            className="mb-6 rounded-full border px-4 py-1.5 shadow-sm"
          >
            The modern workspace for teams
          </Badge>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Your team's work,
            <span className="block text-primary">
              connected.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            Relay brings conversations, teams, workspaces and
            collaboration together so your team can focus on
            building great things.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Button
              size="lg"
              className="h-12 px-7 shadow-lg"
              onClick={() => navigate("/auth/signup")}
            >
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7"
              onClick={() => {
                document
                  .getElementById("product-showcase")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Play className="mr-2 h-4 w-4" />
              See how Relay works
            </Button>

          </div>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto mt-20 max-w-6xl">

          <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />

          <div className="relative rounded-2xl border bg-card p-2 shadow-2xl">

            <div className="overflow-hidden rounded-xl border bg-background">

              {/* Browser bar */}
              <div className="flex h-10 items-center border-b px-4">

                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>

                <div className="mx-auto hidden rounded-md bg-muted px-20 py-1 text-[10px] text-muted-foreground sm:block">
                  app.relay.work
                </div>

              </div>

              {/* App */}
              <div className="grid min-h-[420px] grid-cols-[190px_1fr]">

                {/* Sidebar */}
                <div className="hidden border-r bg-muted/30 p-4 sm:block">

                  <div className="mb-7 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                      R
                    </div>

                    <span className="text-sm font-semibold">
                      Relay
                    </span>
                  </div>

                  <div className="space-y-1">

                    <div className="rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                      Home
                    </div>

                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Messages
                    </div>

                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                      <Hash className="h-3.5 w-3.5" />
                      Channels
                    </div>

                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      Team
                    </div>

                  </div>
                </div>

                {/* Main */}
                <div className="p-5 sm:p-7">

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xl font-semibold">
                        Good morning 👋
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Here's what's happening with your team.
                      </p>
                    </div>

                    <div className="hidden h-8 w-8 rounded-full bg-muted sm:block" />

                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">

                    {[
                      ["Messages", "128"],
                      ["Channels", "24"],
                      ["Team members", "42"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border bg-card p-4"
                      >
                        <p className="text-xs text-muted-foreground">
                          {label}
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                          {value}
                        </p>
                      </div>
                    ))}

                  </div>

                  <div className="mt-5 rounded-xl border bg-card p-5">

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        Recent conversations
                      </p>

                      <span className="text-xs text-muted-foreground">
                        View all
                      </span>
                    </div>

                    <div className="mt-4 divide-y">

                      {[
                        ["# project-alpha", "The new API is ready for review."],
                        ["# design", "The new dashboard design is ready."],
                        ["# engineering", "Deployment completed successfully."],
                      ].map(([channel, message]) => (
                        <div
                          key={channel}
                          className="flex items-center justify-between gap-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-medium">
                              {channel}
                            </p>

                            <p className="mt-1 truncate text-xs text-muted-foreground">
                              {message}
                            </p>
                          </div>

                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            2m
                          </span>
                        </div>
                      ))}

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};