// import { APP_ROUTES } from "@/app/constants/routes";

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
    title: "General Information",
    description: "Company details and contact info",
    // route: APP_ROUTES.AUTH.ONBOARDING_FORM_STEP_1,
    isOptional: false,
  },
  {
    stepNumber: 2,
    title: "Location Details",
    description: "Company location and address",
    // route: APP_ROUTES.AUTH.ONBOARDING_FORM_STEP_2,
    isOptional: false,
  },
  {
    stepNumber: 3,
    title: "Industry Selection",
    description: "Choose your business industry",
    // route: APP_ROUTES.AUTH.ONBOARDING_FORM_STEP_3,
    isOptional: false,
  },
  {
    stepNumber: 4,
    title: "Document Upload",
    description: "Upload business documents (Optional)",
    // route: APP_ROUTES.AUTH.ONBOARDING_FORM_STEP_4,
    isOptional: true,
  },
  {
    stepNumber: 5,
    title: "Team Members",
    description: "Add your team members (Optional)",
    // route: APP_ROUTES.AUTH.ONBOARDING_FORM_STEP_5,
    isOptional: true,
  },
];

export default onboardingSteps;
