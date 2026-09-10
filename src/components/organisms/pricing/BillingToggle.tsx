import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BillingCycle } from "@/data/pricing.data";

interface BillingToggleProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

export const BillingToggle = ({
  billingCycle,
  setBillingCycle,
}: BillingToggleProps) => {
  return (
    <div className="mb-12 flex justify-center">

      <div className="flex items-center rounded-full border bg-muted/50 p-1">

        <Button
          variant={billingCycle === "monthly" ? "default" : "ghost"}
          className="rounded-full px-6"
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </Button>

        <Button
          variant={billingCycle === "yearly" ? "default" : "ghost"}
          className="rounded-full px-6"
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly
        </Button>

        <Badge className="mr-2 ml-2 hidden sm:inline-flex">
          Save 2 months
        </Badge>

      </div>

    </div>
  );
};