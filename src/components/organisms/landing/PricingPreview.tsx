import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PricingPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">

        <Badge className="mb-4">
          <Sparkles className="mr-2 h-4 w-4" />
          Relay Plus
        </Badge>

        <h2 className="text-4xl font-bold tracking-tight">
          Choose the Relay experience that fits you
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Start for free or unlock RelayAI and advanced collaboration
          features with Relay Plus.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {/* Basic */}
          <Card className="text-left">
            <CardHeader>
              <CardTitle>Relay Basic</CardTitle>
              <p className="text-sm text-muted-foreground">
                Everything you need to get started.
              </p>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">Free</span>
              </div>

              <div className="space-y-3">
                {[
                  "Workspaces",
                  "Team channels",
                  "Real-time messaging",
                  "Collaborative docs",
                  "File sharing",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plus */}
          <Card className="relative border-primary text-left">
            <div className="absolute right-4 top-4">
              <Badge>Popular</Badge>
            </div>

            <CardHeader>
              <CardTitle>Relay Plus</CardTitle>
              <p className="text-sm text-muted-foreground">
                Unlock the full Relay experience.
              </p>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹19</span>
                <span className="text-muted-foreground"> / month</span>
              </div>

              <div className="space-y-3">
                {[
                  "Everything in Relay Basic",
                  "RelayAI",
                  "AI-powered assistance",
                  "Advanced search",
                  "Advanced collaboration",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        <Button
          className="mt-10 cursor-pointer"
          size="lg"
          onClick={() => navigate("/pricing")}
        >
          View all plans
        </Button>

      </div>
    </section>
  );
};