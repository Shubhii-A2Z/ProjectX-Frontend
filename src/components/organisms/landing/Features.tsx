import {
  Hash,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Team communication",
    description:
      "Keep your team's conversations organized and accessible in one place.",
  },
  {
    icon: Hash,
    title: "Organized channels",
    description:
      "Create dedicated channels for projects, teams, topics and everything in between.",
  },
  {
    icon: Users,
    title: "Built for teams",
    description:
      "Bring everyone together and make collaboration simple across your organization.",
  },
  {
    icon: Zap,
    title: "Fast and focused",
    description:
      "Everything you need to communicate without constantly switching between apps.",
  },
];

export const Features = () => {
  return (
    <section
      id="features"
      className="border-t bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Everything connected
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One workspace.
            <br />
            Endless possibilities.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Relay brings the tools your team uses every day into
            one connected workspace.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border-none bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <CardTitle>
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}

        </div>
      </div>
    </section>
  );
};