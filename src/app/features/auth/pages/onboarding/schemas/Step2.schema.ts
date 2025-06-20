import { z } from "zod";

export const onboardingStep2Schema = z.object({
  country: z.string().trim().min(1, "Country is required"),
  state: z.string().trim().optional(),
  city: z.string().trim().min(1, "City is required"),
});

export type OnboardingStep2FormData = z.infer<typeof onboardingStep2Schema>;
