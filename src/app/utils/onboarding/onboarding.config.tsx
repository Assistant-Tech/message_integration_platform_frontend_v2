interface OnboardingStep {
  stepNumber: number;
  title: string;
  description: string;
  route?: string;
  isOptional?: boolean;
}

const onboardingSteps: OnboardingStep[] = [
  {
    stepNumber: 1,
    title: "Company basics",
    description: "Name, email, phone, website",
    isOptional: false,
  },
  {
    stepNumber: 2,
    title: "Location",
    description: "Where your company is based",
    isOptional: false,
  },
  {
    stepNumber: 3,
    title: "Industry",
    description: "Helps us tailor your experience",
    isOptional: false,
  },
  {
    stepNumber: 4,
    title: "Business documents",
    description: "Optional — can be added later",
    isOptional: true,
  },
  {
    stepNumber: 5,
    title: "Team members",
    description: "Optional — invite anytime",
    isOptional: true,
  },
];

export default onboardingSteps;
