import {
  FileText,
  Hash,
  MessageCircle,
  Users,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const views = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    title: "Conversations that stay organized.",
    description:
      "Keep team conversations focused with dedicated channels and spaces for every project.",
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: Users,
    title: "Everything your team needs.",
    description:
      "Bring your people, projects and conversations into one connected workspace.",
  },
  {
    id: "channels",
    label: "Channels",
    icon: Hash,
    title: "Give every conversation a place.",
    description:
      "Create channels around projects, teams and topics so important information stays easy to find.",
  },
  {
    id: "files",
    label: "Files",
    icon: FileText,
    title: "Keep context close to the work.",
    description:
      "Keep important resources alongside the conversations where they're actually being discussed.",
  },
];

export const ProductShowcase = () => {
  const [activeView, setActiveView] = useState("chat");

  const active = views.find((view) => view.id === activeView) ?? views[0];
  const ActiveIcon = active.icon;

  return (
    <section
      id="product-showcase"
      className="border-t bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            See Relay in action
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One workspace.
            <br />
            <span className="text-primary">
              Everything connected.
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground">
            Relay brings the pieces of your team's work together
            without getting in the way.
          </p>

        </div>

        {/* Selector */}
        <div className="mx-auto mt-10 flex max-w-fit flex-wrap justify-center gap-2 rounded-xl border bg-background p-1.5 shadow-sm">

          {views.map((view) => {
            const Icon = view.icon;
            const isActive = activeView === view.id;

            return (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveView(view.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {view.label}
              </button>
            );
          })}

        </div>

        {/* Showcase */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Text */}
          <div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ActiveIcon className="h-5 w-5" />
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
              {active.title}
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              {active.description}
            </p>

          </div>

          {/* Mock UI */}
          <div className="relative">

            <div className="absolute -inset-5 rounded-3xl bg-primary/5 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">

              {/* Top */}
              <div className="flex h-12 items-center justify-between border-b px-5">

                <div className="flex items-center gap-2">
                  <ActiveIcon className="h-4 w-4 text-primary" />

                  <span className="text-sm font-semibold">
                    {active.label}
                  </span>
                </div>

                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-7 w-7 rounded-full border-2 border-background bg-muted"
                    />
                  ))}
                </div>

              </div>

              {/* Body */}
              <div className="grid min-h-[350px] grid-cols-[150px_1fr]">

                <div className="hidden border-r bg-muted/20 p-4 sm:block">

                  <div className="text-xs font-semibold">
                    Workspace
                  </div>

                  <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                    <div className="rounded-md bg-primary/10 px-3 py-2 text-primary">
                      General
                    </div>

                    <div className="px-3 py-2">
                      Engineering
                    </div>

                    <div className="px-3 py-2">
                      Design
                    </div>

                    <div className="px-3 py-2">
                      Project Alpha
                    </div>
                  </div>

                </div>

                <div className="p-5">

                  <div className="space-y-5">

                    {[
                      ["Alex", "The new API is ready for review."],
                      ["Sarah", "I'll take a look at it today."],
                      ["Jordan", "Perfect. Let's ship it after review."],
                    ].map(([name, message]) => (
                      <div
                        key={name}
                        className="flex gap-3"
                      >
                        <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10" />

                        <div className="min-w-0">
                          <p className="text-xs font-semibold">
                            {name}
                          </p>

                          <div className="mt-1 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                            {message}
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>

                  <div className="mt-8 rounded-lg border bg-background px-4 py-3 text-xs text-muted-foreground">
                    Write a message...
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