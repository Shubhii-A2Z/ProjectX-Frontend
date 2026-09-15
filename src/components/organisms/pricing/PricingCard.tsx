import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  onSelect: () => void;
}

export const PricingCard = ({
  name,
  description,
  price,
  features,
  popular = false,
  onSelect,
}: PricingCardProps) => {

  const navigate=useNavigate();

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
        ${
          popular
            ? "border-violet-400 shadow-lg shadow-violet-500/10"
            : "hover:border-muted-foreground/30"
        }
      `}
    >

      {popular && (
        <div className="absolute right-0 top-0">
          <div className="flex items-center gap-1 rounded-bl-xl bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Most Popular
          </div>
        </div>
      )}

      <CardHeader className="p-8">

        <p className="mb-2 text-sm font-medium text-muted-foreground">
          {popular ? "For growing teams" : "For getting started"}
        </p>

        <CardTitle className="text-2xl">
          {name}
        </CardTitle>

        <p className="mt-2 min-h-10 text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex items-end gap-1">

          <span className="text-5xl font-bold tracking-tight">
            {price === 0 ? "Free" : `₹${price}`}
          </span>

          {price > 0 && (
            <span className="mb-1 text-sm text-muted-foreground">
              / month
            </span>
          )}

        </div>

      </CardHeader>

      <CardContent className="px-8">

        <div className="mb-6 h-px bg-border" />

        <p className="mb-4 text-sm font-semibold">
          What's included
        </p>

        <div className="space-y-3">

          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 text-sm"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
              />

              <span>{feature}</span>
            </div>
          ))}

        </div>

      </CardContent>

      <CardFooter className="p-8">

        <Button
          className="w-full cursor-pointer"
          size="lg"
          variant={popular ? "default" : "outline"}
          onClick={price===0 ? onSelect : () => navigate("/makePayment")}
        >
          {price === 0 ? "Start for free" : "Get Relay Plus"}
        </Button>

      </CardFooter>

    </Card>
  );
};