export type FeatureKey =
  | "Maximum number of chat apps"
  | "Maximum number of staffs"
  | "Send unlimited message"
  | "Assign chats to team member"
  | "View stats"
  | "View team report"
  | "Priority Email Support"
  | "API access for custom support";

export type Plan = {
  name: string;
  features: Record<FeatureKey, string | boolean>;
};

export const plans: Plan[] = [
  {
    name: "Starter Plan",
    features: {
      "Maximum number of chat apps": "2",
      "Maximum number of staffs": "2",
      "Send unlimited message": true,
      "Assign chats to team member": false,
      "View stats": true,
      "View team report": false,
      "Priority Email Support": false,
      "API access for custom support": false,
    },
  },
  {
    name: "Growth Plan",
    features: {
      "Maximum number of chat apps": "4",
      "Maximum number of staffs": "4",
      "Send unlimited message": true,
      "Assign chats to team member": true,
      "View stats": true,
      "View team report": true,
      "Priority Email Support": true,
      "API access for custom support": true,
    },
  },
  {
    name: "Custom Plan",
    features: {
      "Maximum number of chat apps": "12",
      "Maximum number of staffs": "12",
      "Send unlimited message": true,
      "Assign chats to team member": true,
      "View stats": true,
      "View team report": true,
      "Priority Email Support": true,
      "API access for custom support": true,
    },
  },
];
