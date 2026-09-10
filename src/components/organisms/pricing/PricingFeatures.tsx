import {
  Bot,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "RelayAI",
    description:
      "Get intelligent assistance directly inside your workspace.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description:
      "Find conversations, documents and information faster.",
  },
  {
    icon: Users,
    title: "Better Collaboration",
    description:
      "Give your team more powerful tools to work together.",
  },
  {
    icon: Sparkles,
    title: "More Possibilities",
    description:
      "Unlock the features that make Relay more powerful as your team grows.",
  },
];

export const PricingFeatures = () => {
  return (
    <section className="px-6 py-28">

      <div className="mx-auto max-w-6xl">

        <div className="mb-14 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-500">
            Why Relay Plus?
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            More than just another workspace
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Relay Plus brings powerful collaboration and AI capabilities
            into the same place your team already works.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group rounded-2xl border bg-card p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                <div
                  className="
                    mb-5 flex h-11 w-11 items-center justify-center
                    rounded-xl bg-muted
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};