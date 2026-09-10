import { Check, Minus } from "lucide-react";

import { comparisonFeatures } from "@/data/pricing.data";

export const PricingFeatureComparison = () => {
  return (
    <section className="border-y bg-muted/20 px-6 py-24">

      <div className="mx-auto max-w-5xl">

        <div className="mb-12 text-center">

          <h2 className="text-3xl font-bold tracking-tight">
            Compare Relay plans
          </h2>

          <p className="mt-3 text-muted-foreground">
            See exactly what's included in each plan.
          </p>

        </div>

        <div className="overflow-hidden rounded-2xl border bg-background">

          {/* Header */}

          <div className="grid grid-cols-3 border-b bg-muted/40 p-5 text-sm font-semibold">

            <div>
              Feature
            </div>

            <div className="text-center">
              Basic
            </div>

            <div className="text-center">
              Plus
            </div>

          </div>

          {/* Rows */}

          {comparisonFeatures.map((feature) => (
            <div
              key={feature.name}
              className="
                grid grid-cols-3
                border-b p-5
                text-sm
                last:border-b-0
                hover:bg-muted/30
              "
            >

              <div>
                {feature.name}
              </div>

              <div className="flex justify-center">

                {feature.basic ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Minus className="h-5 w-5 text-muted-foreground" />
                )}

              </div>

              <div className="flex justify-center">

                {feature.plus ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Minus className="h-5 w-5 text-muted-foreground" />
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};