import { useState } from "react";

import { BillingToggle } from "@/components/organisms/pricing/BillingToggle";
import { PricingCards } from "@/components/organisms/pricing/PricingContainer";
import { PricingCTA } from "@/components/organisms/pricing/PricingCTA";
import { PricingFAQ } from "@/components/organisms/pricing/PricingFAQ";
import { PricingFeatureComparison } from "@/components/organisms/pricing/PricingFeatureComparison";
import { PricingFeatures } from "@/components/organisms/pricing/PricingFeatures";
import { PricingHero } from "@/components/organisms/pricing/PricingHero";
import type { BillingCycle } from "@/data/pricing.data";

export const Pricing = () => {
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>("monthly");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <PricingHero />

        <BillingToggle
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />

        <PricingCards
          billingCycle={billingCycle}
        />

        <PricingFeatures />

        <PricingFeatureComparison />

        <PricingFAQ />

        <PricingCTA />
      </main>
    </div>
  );
};