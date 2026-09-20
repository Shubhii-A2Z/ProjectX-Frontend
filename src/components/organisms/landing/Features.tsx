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
      "Keep conversations organized and accessible so your team always knows where to talk.",
  },
  {
    icon: Hash,
    title: "Organized channels",
    description:
      "Create dedicated spaces for projects, teams, topics and everything in between.",
  },
  {
    icon: Users,
    title: "Connected workspaces",
    description:
      "Bring people and conversations together inside workspaces built around your team.",
  },
  {
    icon: Zap,
    title: "Fast and focused",
    description:
      "Get the communication you need without constantly jumping between different tools.",
  },
];

export const Features = () => {
  return (
    <section
      id="features"
      className="border-t"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Everything connected
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built around how
            <br />
            <span className="text-primary">
              teams actually work.
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground">
            Relay gives your team a simple place to communicate,
            organize and collaborate.
          </p>

        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="
                  group
                  border
                  bg-background
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                  hover:shadow-xl
                "
              >
                <CardHeader>

                  <div
                    className="
                      mb-4
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
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