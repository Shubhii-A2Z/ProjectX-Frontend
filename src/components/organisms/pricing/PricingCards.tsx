import { useNavigate } from "react-router-dom";

import {
  basicFeatures,
  type BillingCycle,
  plusFeatures,
  pricingData,
} from "@/data/pricing.data";

import { PricingCard } from "./PricingCard";

interface PricingCardsProps {
  billingCycle: BillingCycle;
}

export const PricingCards = ({
  billingCycle,
}: PricingCardsProps) => {
  const navigate = useNavigate();

  const basicPrice = pricingData[billingCycle].basic.price;
  const plusPrice = pricingData[billingCycle].plus.price;

  const handleBasic = () => {
    navigate("/auth/signup");
  };

  const handlePlus = () => {
    // Razorpay will be connected here.
    console.log("Selected Relay Plus");
  };

  return (
    <section className="px-6">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

        <PricingCard
          name="Relay Basic"
          description="Everything you need to bring your team together."
          price={basicPrice}
          features={basicFeatures}
          onSelect={handleBasic}
        />

        <PricingCard
          name="Relay Plus"
          description="Unlock RelayAI and the full Relay experience."
          price={plusPrice}
          features={plusFeatures}
          popular
          onSelect={handlePlus}
        />

      </div>
    </section>
  );
};