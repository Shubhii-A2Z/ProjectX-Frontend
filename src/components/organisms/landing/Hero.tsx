import { ArrowRight, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:pb-32 md:pt-32">
        
        <div className="mx-auto max-w-4xl text-center">

          <Badge
            variant="secondary"
            className="mb-6 rounded-full px-4 py-1.5"
          >
            The modern workspace for teams
          </Badge>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Everything your team needs.
            <span className="block text-primary">
              All in one place.
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
              className="h-12 px-7"
            >
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7"
            >
              <Play className="mr-2 h-4 w-4" />
              See how Relay works
            </Button>

          </div>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          
          <div className="rounded-2xl border bg-card p-2 shadow-2xl">
            
            <div className="overflow-hidden rounded-xl border bg-muted/30">
              
              {/* Fake browser bar */}
              <div className="flex h-10 items-center gap-2 border-b px-4">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              {/* Application preview */}
              <div className="grid min-h-[420px] grid-cols-[200px_1fr]">

                {/* Sidebar */}
                <div className="hidden border-r bg-muted/40 p-4 sm:block">
                  <div className="mb-6 text-sm font-semibold">
                    Relay
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="rounded-md bg-primary/10 px-3 py-2 text-primary">
                      Home
                    </div>

                    <div className="px-3 py-2">
                      Messages
                    </div>

                    <div className="px-3 py-2">
                      Workspaces
                    </div>

                    <div className="px-3 py-2">
                      Channels
                    </div>
                  </div>
                </div>

                {/* Main */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-xl font-semibold">
                      Welcome back 👋
                    </div>

                    <div className="mt-1 text-sm text-muted-foreground">
                      Here's what's happening with your team.
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">

                    <div className="rounded-xl border bg-background p-5">
                      <div className="text-sm text-muted-foreground">
                        Messages
                      </div>

                      <div className="mt-2 text-3xl font-bold">
                        128
                      </div>
                    </div>

                    <div className="rounded-xl border bg-background p-5">
                      <div className="text-sm text-muted-foreground">
                        Channels
                      </div>

                      <div className="mt-2 text-3xl font-bold">
                        24
                      </div>
                    </div>

                    <div className="rounded-xl border bg-background p-5">
                      <div className="text-sm text-muted-foreground">
                        Team members
                      </div>

                      <div className="mt-2 text-3xl font-bold">
                        42
                      </div>
                    </div>

                  </div>

                  <div className="mt-6 rounded-xl border bg-background p-5">
                    <div className="text-sm font-semibold">
                      Recent conversations
                    </div>

                    <div className="mt-4 space-y-4">
                      {[
                        "Frontend Team",
                        "Backend Team",
                        "ProjectX",
                      ].map((channel) => (
                        <div
                          key={channel}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">
                            # {channel}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            2m ago
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