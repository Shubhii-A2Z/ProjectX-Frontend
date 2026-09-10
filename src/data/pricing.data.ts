export type BillingCycle = "monthly" | "yearly";

export const pricingData = {
  monthly: {
    basic: {
      price: 0,
    },
    plus: {
      price: 19,
    },
  },

  yearly: {
    basic: {
      price: 0,
    },
    plus: {
      price: 190,
    },
  },
};

export const basicFeatures = [
  "Unlimited workspaces",
  "Team channels",
  "Real-time messaging",
  "Collaborative docs",
  "File sharing",
  "Basic search",
  "Notifications",
];

export const plusFeatures = [
  "Everything in Relay Basic",
  "RelayAI",
  "AI-powered assistance",
  "Advanced search",
  "Advanced collaboration",
  "More integrations",
  "Priority features",
];

export const comparisonFeatures = [
  {
    name: "Workspaces",
    basic: true,
    plus: true,
  },
  {
    name: "Team channels",
    basic: true,
    plus: true,
  },
  {
    name: "Real-time messaging",
    basic: true,
    plus: true,
  },
  {
    name: "Collaborative docs",
    basic: true,
    plus: true,
  },
  {
    name: "File sharing",
    basic: true,
    plus: true,
  },
  {
    name: "Advanced search",
    basic: false,
    plus: true,
  },
  {
    name: "RelayAI",
    basic: false,
    plus: true,
  },
  {
    name: "AI assistance",
    basic: false,
    plus: true,
  },
  {
    name: "Advanced collaboration",
    basic: false,
    plus: true,
  },
];